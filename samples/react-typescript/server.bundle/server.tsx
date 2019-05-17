import * as serializeJavascript from 'serialize-javascript';
import * as React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderToStringWithData } from 'react-apollo';
import Helmet from 'react-helmet';
import GraphQLClientFactory from '../src/lib/GraphQLClientFactory';
import i18ninit from '../src/i18n';
import AppRoot, { routePatterns } from '../src/AppRoot';
import { setServerSideRenderingState, SsrState } from '../src/RouteHandler';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { RouteUrlParser } from '@sitecore-jss/sitecore-jss-proxy/types/RouteUrlParser';
import { Environment } from '../src/Environment';
import { getSitecoreGraphqlEndpoint } from '../src/AppGlobals';
import * as fs from 'fs';
import * as path from 'path';
import { LayoutServiceData, LayoutServiceContextData } from '@sitecore-jss/sitecore-jss';
import { deepStrictEqual } from 'assert';

// Load the index.html template file contents:
// In development request from http://localhost:3000?prestine (Create React App development server must be running) 
// In production this file can be read from the filesystem (./build/index.html or ./index.html)
let indexTemplate;
if (Environment.reactAppProcessEnv.NODE_ENV === 'production') {
  let indexHtmlFilePath = path.join(process.cwd(), 'build/index.html');
  if (!fs.existsSync(indexHtmlFilePath)) {
    // For example in deployment to Sitecore we are NOT in the build folder
    indexHtmlFilePath = path.join(process.cwd(), 'index.html');
  }

  if (!fs.existsSync(indexHtmlFilePath)) {
    throw new Error(`In production the 'index.html' file is expected at '${indexHtmlFilePath}' but is missing.`);
  }

  indexTemplate = fs.readFileSync(indexHtmlFilePath, 'utf8');
  [
    'REACT_APP_NAME',
    'REACT_APP_APPINSIGHTS_KEY',
    'REACT_APP_BUILDVERSION',
    'REACT_APP_ENVIRONMENT',
    'REACT_APP_ENVIRONMENTCONNECTIONS',
    'REACT_APP_ADDITIONALSETTINGS',

    'REACT_APP_SITECORE_JSS_APP_NAME',
    'REACT_APP_SITECORE_API_KEY',
    'REACT_APP_SITECORE_API_HOST',
    'REACT_APP_SITECORE_DEFAULT_LANGUAGE',
    'REACT_APP_SITECORE_ENABLE_DEBUG',
    'REACT_APP_SITECORE_CONNECTED',
    'REACT_APP_SITECORE_PATH_REWRITE_EXCLUDE_ROUTES'
  ].map((envName: string) => {
    const value: string = process.env[envName]? process.env[envName] : '';
    indexTemplate = indexTemplate.replace(`##${envName}##`, value);
  });
}
/** Asserts that a string replace actually replaced something */
function assertReplace(s: string, value: string, replacement: string): string {
  let success = false;
  const result = s.replace(value, () => {
    success = true;
    return replacement;
  });

  if (!success) {
    throw new Error(
      `Unable to match replace token '${value}' in index.html template. If the HTML shell for the app is modified, also fix the replaces in server.js. Server-side rendering has failed!`
    );
  }

  return result;
}

/** Export the API key. This will be used by default in Headless mode, removing the need to manually configure the API key on the proxy. */
export const apiKey: string = Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_KEY;

/** Export the app name. This will be used by default in Headless mode, removing the need to manually configure the app name on the proxy. */
export const appName: string = Environment.reactAppProcessEnv.REACT_APP_SITECORE_JSS_APP_NAME;

/**
 * Main entry point to the application when run via Server-Side Rendering,
 * either in Integrated Mode, or with a Node proxy host like the node-headless-ssr-proxy sample.
 * This function will be invoked by the server to return the rendered HTML.
 * @param {Function} callback Function to call when rendering is complete. Signature callback(error, successData).
 * @param {string} routePath Current route path being rendered
 * @param {string} data JSON Layout service data for the rendering from Sitecore
 * @param {string} viewBag JSON view bag data from Sitecore (extensible context stuff)
 */
export function renderView(callback: (error: Error | null, successData: {html: string } | null) => void, routePath: string, data: any, viewBag: any): void {
  try {
    // const state = parseServerData(data, viewBag);
    let state: SsrState = { 
      ...parseServerData(data, viewBag), 
      context: undefined, 
      APOLLO_STATE: undefined 
    };

    setServerSideRenderingState(state);

    /*
      GraphQL Data
      The Apollo Client needs to be initialized to make GraphQL available to the JSS app.
      Not using GraphQL? Remove this, and the ApolloContext from `AppRoot`.
    */
    const graphQLClient: ApolloClient<NormalizedCacheObject> = GraphQLClientFactory(getSitecoreGraphqlEndpoint(), true, {});

    /*
      App Rendering
    */
    initializei18n(state)
      .then(() => {
        return new Promise((resolve, reject) => {
          if (Environment.reactAppProcessEnv.NODE_ENV !== 'production') {
              fetch('http://localhost:3000?prestine', { mode: 'no-cors', cache: 'no-cache' })
                .then(res => res.text())
                .then(res => {
                  indexTemplate = res;

                  // replace <script src="{relativeurl}"></script> with <script src="http://localhost:3000{relativeurl}"></script>
                  // so client scripts are loaded from the application running at http://localhost:3000
                  indexTemplate = indexTemplate.replace(/<script.*?"(.*?)"><\/script>/img, '<script src="http://localhost:3000$1"></script>')
                  resolve();
                })
                .catch(error => {
                  reject(error); 
                });
          } else {
            resolve(); // nothing to load, is already imported
          }
        });
      })
      .then(() =>
        // renderToStringWithData() allows any GraphQL queries to complete their async call
        // before the SSR result is returned, so that the resulting HTML from GQL query results
        // is included in the SSR'ed markup instead of whatever the 'loading' state is.
        // Not using GraphQL? Use ReactDOMServer.renderToString() instead.
        renderToStringWithData(
          <AppRoot path={routePath} Router={StaticRouter} graphQLClient={graphQLClient} />
        )
      )
      .then((renderedAppHtml) => {
        const helmet = Helmet.renderStatic();

        // We remove the viewBag from the server-side state before sending it back to the client.
        // This saves bandwidth, because by default the viewBag contains the translation dictionary,
        // which is better cached as a separate client HTTP request than on every page, and HTTP context
        // information that is not meaningful to the client-side rendering.
        // If you wish to place items in the viewbag that are needed by client-side rendering, this
        // can be removed - but still delete state.viewBag.dictionary, at least.
        delete state.viewBag;

        // We add the GraphQL state to the SSR state so that we can avoid refetching queries after client load
        // Not using GraphQL? Get rid of this.
        state.APOLLO_STATE = graphQLClient.cache.extract();

        // Inject the rendered app into the index.html template (built from /public/index.html)
        // IMPORTANT: use serialize-javascript or similar instead of JSON.stringify() to emit initial state,
        // or else you're vulnerable to XSS.
        let html = indexTemplate;

        // write the React app
        html = assertReplace(
          html,
          '<div id="root"></div>',
          `<div id="root">${renderedAppHtml}</div>`
        );
        // write the string version of our state
        html = assertReplace(
          html,
          '<script type="application/json" id="__JSS_STATE__">null',
          `<script type="application/json" id="__JSS_STATE__">${serializeJavascript(state, {
            isJSON: true,
          })}`
        );

        // render <head> contents from react-helmet
        html = assertReplace(
          html,
          '<head>',
          `<head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`
        );


        callback(null, { html });
      })
      .catch((error) => callback(error, null));
  } catch (err) {
    // need to ensure the callback is always invoked no matter what
    // or else SSR will hang
    callback(err, null);
  }
}

/**
 * Parses an incoming url to match against the route table. This function is implicitly used
 * by node-headless-ssr-proxy when rendering the site in headless mode. It enables rewriting the incoming path,
 * say '/en-US/hello', to the path and language to pass to Layout Service (a Sitecore item path), say
 * { sitecoreRoute: '/hello', lang: 'en-US' }.
 * This function is _not_ used in integrated mode, as Sitecore's built in route parsing is used.
 * If no URL transformations are required (i.e. single language site), then this function can be removed.
 */

export const urlRouteParser: RouteUrlParser = url => {
  if (!url) {
    return {};
  }

  let result = {};

  // use react-router-dom to find the route matching the incoming URL
  // then return its match params
  // we are using .some() as a way to loop with a short circuit (so that we stop evaluating route patterns after the first match)
  routePatterns.some((pattern: string) => {
    const match = matchPath(url, { path: pattern });
    if (match && match.params) {
      result = match.params;
      return true;
    }

    return false;
  });

  return result;
}

function parseServerData(data: any, viewBag: any): { viewBag: any, sitecore: any} {
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  return {
    viewBag: parsedViewBag,
    sitecore: parsedData && parsedData.sitecore,
  };
}

function initializei18n(state): Promise<any> {
  // don't init i18n for not found routes
  if (!state || !state.sitecore || !state.sitecore.context) {
    return Promise.resolve();
  }

  return i18ninit(state.sitecore.context.language, state.viewBag.dictionary);
}
