import express from 'express';
import compression from 'compression';  // compresses requests
import scProxy from '@sitecore-jss/sitecore-jss-proxy';
import config from './sitecoreProxyConfiguration';
import { renderView, urlRouteParser } from '../server.bundle/server';
import { createDefaultDisconnectedServer } from '@sitecore-jss/sitecore-jss-dev-tools';

const server = express();
const port: number = parseInt(process.env.PORT) || 3001;

// enable gzip compression for appropriate file types
server.use(compression());

// turn off x-powered-by http header
server.settings['x-powered-by'] = false;

createDefaultDisconnectedServer({
  watchPaths: ['../data'],
  port,
  appRoot: __dirname,
  appName: process.env.SITECORE_JSS_APP_NAME,
  language: 'en',
  server,
  afterMiddlewareRegistered: (expressInstance) => {
    // to make disconnected SSR work, we need to add additional middleware (beyond mock layout service) to handle
    // local static build artifacts, and to handle SSR by loopback proxying to the disconnected
    // layout service on the same express server

    // Serve static app assets from local /dist folder
    expressInstance.use(
  `   /dist/${process.env.SITECORE_JSS_APP_NAME}/`,
      express.static('../build', {
        fallthrough: false, // force 404 for unknown assets under /dist/<appName>/
      })
    );

    // For any other requests, we render app routes server-side and return them
    expressInstance.use('*', scProxy(renderView, config, urlRouteParser));

    server.listen(port, () => {
      console.log(`server listening on port ${port}!`);
    });
  }
});
