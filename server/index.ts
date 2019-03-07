import * as path from 'path';
import express from 'express';
import compression from 'compression';  // compresses requests
import scProxy from '@sitecore-jss/sitecore-jss-proxy';
import { renderView, urlRouteParser } from '../server.bundle/server';
import { setDevelopmentEnvironmentVariables, validateEnvironmentVariables, logEnvironmentVariables} from './setEnvironment'; 
import { getSitecoreProxyConfiguration} from './sitecoreProxyConfiguration';
import { ProxyConfig } from '@sitecore-jss/sitecore-jss-proxy/types/ProxyConfig';
import { createDefaultDisconnectedServer } from '@sitecore-jss/sitecore-jss-dev-tools';

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
    express.static('../build', {
      fallthrough: false, // force 404 for unknown assets under /dist/<appName>/
    })
  );

  // For any other requests, we render app routes server-side and return them
  expressInstance.use('*', scProxy(renderView, config, urlRouteParser));

  expressInstance.listen(port, () => {
    console.log(`server listening on port ${port}!`);
  });
}

// In development set all required environment variables based on:
// .env.development: for disconnected mode
// .env.development.connected: for connected mode
// In production the environment variables are already defined.
console.log("Application Express server with SSR");
if (process.env.NODE_ENV == 'development') {
  console.log("NODE_ENV: development");
  const connected = process.argv.some((arg) => arg === '--connected');
  console.log(`Sitecore mode: ${(connected? 'connected' : 'disconnected')}`);
  setDevelopmentEnvironmentVariables(connected); 
}
validateEnvironmentVariables();
logEnvironmentVariables();

const config: ProxyConfig = getSitecoreProxyConfiguration();
const server = express();
const port: number = parseInt(process.env.PORT) || 3001;

if (process.env.REACT_APP_SITECORE_CONNECTED === 'false') {
  createDefaultDisconnectedServer({
    watchPaths: [path.join(process.cwd(), 'data')], // SvdO, TODO './data'
    port,
    appRoot: path.join(process.cwd(), 'data'), // SvdO, TODO './data'
    appName: process.env.REACT_APP_SITECORE_JSS_APP_NAME,
    language: 'en',
    server,
    afterMiddlewareRegistered: (expressInstance) => {
      // to make disconnected SSR work, we need to add additional middleware (beyond mock layout service) to handle
      // local static build artifacts, and to handle SSR by loopback proxying to the disconnected
      // layout service on the same express server
      prepServer(expressInstance, config, port);
    }
  });
} else {
  prepServer(server, config, port);
}

