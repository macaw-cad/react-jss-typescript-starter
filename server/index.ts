import * as path from 'path';
import express from 'express';
import compression from 'compression';  // compresses requests
import scProxy from '@sitecore-jss/sitecore-jss-proxy';
import { renderView, urlRouteParser } from '../server.bundle/server';
import { setDevelopmentEnvironmentVariables, logEnvironmentVariables} from './setEnvironment'; 
import { getSitecoreProxyConfiguration} from './sitecoreProxyConfiguration';
import { ProxyConfig } from '@sitecore-jss/sitecore-jss-proxy/types/ProxyConfig';
import { createDefaultDisconnectedServer } from '@sitecore-jss/sitecore-jss-dev-tools';

function prepServer(expressInstance: express.Express, config: ProxyConfig, port: number): void {
  // enable gzip compression for appropriate file types
  expressInstance.use(compression());

  // turn off x-powered-by http header
  expressInstance.settings['x-powered-by'] = false;

  // Serve static app assets from local /dist folder
  expressInstance.use(
    `/dist/${process.env.SITECORE_JSS_APP_NAME}/`,
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

// set all required environment variables basen on configuration in package.json and scjssconfig.json
if (process.env.NODE_ENV == 'development') {
  setDevelopmentEnvironmentVariables(); 
}
logEnvironmentVariables();

const config: ProxyConfig = getSitecoreProxyConfiguration();
const server = express();
const port: number = parseInt(process.env.PORT) || 3001;

if (process.env.NODE_ENV == 'production' && process.env.SITECORE_PRODUCTION_DISCONNECTED === 'true') {
  createDefaultDisconnectedServer({
    watchPaths: ['./data'],
    port,
    appRoot: path.resolve(__dirname, './data'),
    appName: process.env.SITECORE_JSS_APP_NAME,
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

