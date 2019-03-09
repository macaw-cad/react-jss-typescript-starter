import * as path from 'path';
import express from 'express';
import proxy from 'http-proxy-middleware';
import compression from 'compression';  // compresses requests
import scProxy from '@sitecore-jss/sitecore-jss-proxy';
import { renderView, urlRouteParser } from '../server.bundle/server';
import { setDevelopmentEnvironmentVariables, validateEnvironmentVariables, logEnvironmentVariables} from './setEnvironment'; 
import { getSitecoreProxyConfiguration} from './sitecoreProxyConfiguration';
import { ProxyConfig } from '@sitecore-jss/sitecore-jss-proxy/types/ProxyConfig';
import { Environment } from '../src/Environment';

function prepServer(expressInstance: express.Express, config: ProxyConfig, port: number): void {
  // enable gzip compression for appropriate file types
  expressInstance.use(compression());

  // turn off x-powered-by http header
  expressInstance.settings['x-powered-by'] = false;

  // Ignore (204 - no content) requests to /sockjs-node/ - is for development tooling client-side
  expressInstance.use('/sockjs-node/', (req, res) => res.status(204));

  // Serve static app assets from local /dist folder
  expressInstance.use(
    `/dist/${process.env.REACT_APP_SITECORE_JSS_APP_NAME}/`,
    express.static('./build', {
      fallthrough: false, // force 404 for unknown assets under /dist/<appName>/
    })
  );

  // For any other requests, we render app routes server-side and return them
  expressInstance.use('*', scProxy(renderView, config, urlRouteParser));

  expressInstance.listen(port, () => {
    console.log(`Web server listening on port ${port}!`);
  });
}

// In development set all required environment variables based on:
// .env.development.disconnected: for disconnected mode
// .env.development.connected: for connected mode
// In production the environment variables are already defined.
console.log("Application Express server with SSR");
console.log(`Current working directory: ${process.cwd()}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const connected = process.argv.some((arg) => arg === '--connected');

console.log(`Sitecore mode: ${(connected? 'connected' : 'disconnected')}`);
if (process.env.NODE_ENV === 'development') {
    setDevelopmentEnvironmentVariables(connected); 
}
validateEnvironmentVariables();
logEnvironmentVariables();

const config: ProxyConfig = getSitecoreProxyConfiguration();
const server = express();
const port: number = 3001;
const proxyPort: number = parseInt(Environment.reactAppProcessEnv.REACT_APP_SITECORE_PROXY_PORT, 10);

// ##### Initial approach: embed disconnected server in web server
// if (Environment.reactAppProcessEnv.REACT_APP_SITECORE_CONNECTED === 'false') {
//   createDefaultDisconnectedServer({
//     appRoot: path.join(__dirname, '..'),
//     appName: Environment.reactAppProcessEnv.REACT_APP_SITECORE_JSS_APP_NAME,
//     watchPaths: ['./data'],
//     language: Environment.reactAppProcessEnv.REACT_APP_SITECORE_DEFAULT_LANGUAGE,
//     port,
//     server,
//     afterMiddlewareRegistered: (expressInstance) => {
//       // to make disconnected SSR work, we need to add additional middleware (beyond mock layout service) to handle
//       // local static build artifacts, and to handle SSR by loopback proxying to the disconnected
//       // layout service on the same express server
//       prepServer(expressInstance, config, port);
//     }
//   });
// } else {
//   prepServer(server, config, port);
// }

prepServer(server, config, port);
// ##### New approach: proxy to the http://localhost:proxyPort
if (Environment.reactAppProcessEnv.REACT_APP_SITECORE_CONNECTED === 'false') {
  const targetUrl = `http://localhost:3042`;
  console.log(`Sitecore disconnected proxy url: ${targetUrl}`);
  let sitecoreDisconnectedServerProxy = proxy(
    [/*'/assets', '/data/media',*/ '/sitecore/api/layout/render', '/sitecore/api/jss/dictionary'],
    {
      target: targetUrl,
      pathRewrite: (path: string, req) => {
        console.log(`PATH: ${path}`);
        path = path.replace('sc_apikey=undefined', `sc_apikey=${Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_KEY}`);
        return path;
      },
      logLevel: 'debug'
    }
  );
  server.use('/assets', express.static(path.join(process.cwd(), 'assets')));
  server.use('/data/media', express.static(path.join(process.cwd(), 'data/media')));

  server.use(sitecoreDisconnectedServerProxy);
}
