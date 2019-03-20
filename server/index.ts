import * as path from 'path';
import express from 'express';
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
// .env.disconnected: for disconnected mode
// .env.connected: for connected mode
// In production the environment variables are already defined externally.
console.log("Application Express server with SSR");
console.log(`Current working directory: ${process.cwd()}`);
console.log(`NODE_ENV: ${Environment.reactAppProcessEnv.NODE_ENV}`);

const connected = process.argv.some((arg) => arg === '--connected');

console.log(`Sitecore mode: ${(connected? 'connected' : 'disconnected')}`);
if (process.env.NODE_ENV === 'development') {
    setDevelopmentEnvironmentVariables(connected); 
}
validateEnvironmentVariables();
logEnvironmentVariables();

const config: ProxyConfig = getSitecoreProxyConfiguration();
const app = express();
const port: number = 3001;

// serve static files from public folder
app.use('/images', express.static(path.join(process.cwd(), Environment.isProduction? 'build/images' : '/public/images')));
app.use('/icons', express.static(path.join(process.cwd(), Environment.isProduction? 'build/icons' : '/public/icons')));
app.use('/partners', express.static(path.join(process.cwd(), Environment.isProduction? 'build/partners' : '/public/partners')));
app.use('/documentation', express.static(path.join(process.cwd(), Environment.isProduction? 'build/documentation' : '/public/documentation')));

app.use(compression());

// turn off x-powered-by http header
app.settings['x-powered-by'] = false;

// Ignore (204 - no content) requests to /sockjs-node/ - is for development tooling client-side
app.use('/sockjs-node/', (req, res) => res.status(204));

// Serve static app assets from local /dist folder
app.use(
  `/dist/${process.env.REACT_APP_SITECORE_JSS_APP_NAME}/`,
  express.static('./build', {
    fallthrough: false, // force 404 for unknown assets under /dist/<appName>/
  })
);

// For any other requests, we render app routes server-side and return them
app.use('*', scProxy(renderView, config, urlRouteParser));

app.listen(port, () => {
  console.log(`Web server listening on port ${port}!`);
});