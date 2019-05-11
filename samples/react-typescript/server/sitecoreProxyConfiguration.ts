import * as fs from 'fs';
import * as path from 'path';
import ipaddr from 'ipaddr.js';
import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import { ProxyConfig } from '@sitecore-jss/sitecore-jss-proxy/types/ProxyConfig';
import { IncomingMessage, ClientRequest, ServerResponse } from 'http';
import { Environment } from '../src/Environment';
import { getSitecoreLayoutServiceRoute } from '../src/AppGlobals';

function getApiHost() {
  const apiHost = Environment.reactAppProcessEnv.REACT_APP_SITECORE_CONNECTED === 'false' ?
    'http://localhost:3042' :
    Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_HOST;
  return apiHost;
}

export function getSitecoreProxyConfiguration(): ProxyConfig {
  // We keep a cached copy of the site dictionary for performance. Default is 60 seconds.
  const dictionaryCache = new NodeCache({ stdTTL: 60 });

  const appName = Environment.reactAppProcessEnv.REACT_APP_SITECORE_JSS_APP_NAME;
  const apiHost = getApiHost();
  /**
   * @type {ProxyConfig}
   */

  const config: ProxyConfig = {

    /**
     * apiHost: your Sitecore instance hostname that is the backend for JSS
     * Should be https for production. Must be https to use SSC auth service,
     * if supporting Sitecore authentication.
     */
    apiHost: apiHost,
    /**
     * layoutServiceRoot: The path to layout service for the JSS application.
     * Some apps, like advanced samples, use a custom LS configuration,
     * e.g. /sitecore/api/layout/render/jss-advanced-react
     */
    layoutServiceRoute: apiHost + getSitecoreLayoutServiceRoute(),
    /**
     * apiKey: The Sitecore SSC API key your app uses.
     * Required.
     */
    apiKey: Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_KEY,
    /**
     * pathRewriteExcludeRoutes: A list of absolute paths
     * that are NOT app routes and should not attempt to render a route
     * using SSR. These route prefixes are directly proxied to the apiHost,
     * allowing the proxy to also proxy GraphQL requests, REST requests, etc.
     * Local static assets, Sitecore API paths, Sitecore asset paths, etc should be listed here.
     * URLs will be encoded, so e.g. for a space use '%20' in the exclude.
     *
     * Need to perform logic instead of a flat list? Remove this and use
     * pathRewriteExcludePredicate function instead: (url) => boolean;
     */
    pathRewriteExcludeRoutes: [
      '/dist',
      '/assets',
      '/data',
      '/sitecore/api',
      '/api',
      '/-/jssmedia',
      '/-/media',
      '/layouts/system',
    ].concat((Environment.reactAppProcessEnv.REACT_APP_SITECORE_PATH_REWRITE_EXCLUDE_ROUTES || '').split('|')),
    /**
     * Writes verbose request info to stdout for debugging.
     * Must be disabled in production for reasonable performance.
     */
    debug: Environment.reactAppProcessEnv.REACT_APP_SITECORE_ENABLE_DEBUG === 'true',
    /**
     * Maximum allowed proxy reply size in bytes. Replies larger than this are not sent.
     * Avoids starving the proxy of memory if large requests are proxied.
     * Default: 10MB
     */
    maxResponseSizeBytes: 10 * 1024 * 1024,

    proxyOptions: {
      // Setting this to false will disable SSL certificate validation
      // when proxying to a SSL Sitecore instance.
      // This is a major security issue, so NEVER EVER set this to false
      // outside local development. Use a real CA-issued certificate.
      secure: true,

      // target host for proxy
      target: Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_HOST,

      /**
       * Add the original client IP as a header for Sitecore Analytics and GeoIP.
       * We could use the xfwd option of http-proxy, but express will use ipv6 formatted
       * IPs by default and there are reported issues using ipv6 with GeoIP.
       */
      onProxyReq: (proxyReq, req, res) => {
        const apiHost = getApiHost();
        if (!req.url.startsWith('http')) {
          req.url = apiHost + req.url;
        }
        let ipv4 = ipaddr.process(req.ip).toString(); // strip ipv6 prefix added by node/express
        if (ipv4 === '::1') {
          ipv4 = '127.0.0.1';
        }
        proxyReq.setHeader('X-Forwarded-For', ipv4);

        // because this is a proxy, all headers are forwarded on to the Sitecore server
        // but, if we SSR we only understand how to decompress gzip and deflate. Some
        // modern browsers would send 'br' (brotli) as well, and if the Sitecore server
        // supported that (maybe via CDN) it would fail SSR as we can't decode the Brotli
        // response. So, we force the accept-encoding header to only include what we can understand.
        if (req.headers['accept-encoding']) {
          proxyReq.setHeader('Accept-Encoding', 'gzip, deflate');
        }

        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
      },
    },

    /**
     * Custom error handling in case our app fails to render.
     * Return null to pass through server response, or { content, statusCode }
     * to override server response.
     *
     * Note: 404s are not errors, and will have null route data + context sent to the JSS app,
     * so the app can render a 404 route.
     */
    onError: (err: Error, response: IncomingMessage) => {
      return new Promise((resolve) => {
        // http 200 = an error in rendering; http 500 = an error on layout service
        if (response.statusCode !== 500 && response.statusCode !== 200) {
          resolve({
            statusCode: undefined,
            content: undefined
          });
        }
        const errorHtmlPath = Environment.reactAppProcessEnv.NODE_ENV === 'production' ?
          path.join(process.cwd(), 'build/error.html') :
          path.join(process.cwd(), 'public/error.html'); // development has no build folder yet
          
        resolve({
          statusCode: 500,
          content: fs.readFileSync(errorHtmlPath, 'utf8')
        });
      })
    },

    createViewBag: (request: ClientRequest, response: ServerResponse, proxyResponse: IncomingMessage, layoutServiceData: any) => {
      // fetches the dictionary from the Sitecore server for the current language so it can be SSR'ed
      // has a default cache applied since dictionary data is quite static and it helps rendering performance a lot
      if (!layoutServiceData || !layoutServiceData.sitecore || !layoutServiceData.sitecore.context) {
        return {};
      }

      const language = layoutServiceData.sitecore.context.language || Environment.reactAppProcessEnv.REACT_APP_SITECORE_DEFAULT_LANGUAGE;
      const site =
        layoutServiceData.sitecore.context.site && layoutServiceData.sitecore.context.site.name;

      if (!site) {
        return {};
      }

      const cacheKey = `${site}_${language}`;

      const cached = dictionaryCache.get(cacheKey);

      if (cached) return Promise.resolve(cached);

      const apiHost = getApiHost();
      return fetch(
        `${apiHost}/sitecore/api/jss/dictionary/${appName}/${language}?sc_apikey=${
          Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_KEY
        }`
      )
        .then((result) => result.json())
        .then((json) => {
          const viewBag = {
            dictionary: json && json.phrases,
          };

          dictionaryCache.set(cacheKey, viewBag);
          return viewBag;
        });
    },
  };

  return config;
}
