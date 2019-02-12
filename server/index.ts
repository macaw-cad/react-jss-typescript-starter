import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

import express from 'express';
import compression from 'compression';  // compresses requests
import scProxy from '@sitecore-jss/sitecore-jss-proxy';
import config from './config';
import { renderView, urlRouteParser } from '../server.bundle/server';
const server = express();
const port = process.env.PORT || 3000;

// enable gzip compression for appropriate file types
server.use(compression());

// turn off x-powered-by http header
server.settings['x-powered-by'] = false;

// Serve static app assets from local /dist folder
server.use(
  '/dist/hello-jss-typescript/',
  express.static('../build', {
    fallthrough: false, // force 404 for unknown assets under /dist/hello-jss-typescript/
  })
);

// For any other requests, we render app routes server-side and return them
server.use('*', scProxy(renderView, config, urlRouteParser));

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
