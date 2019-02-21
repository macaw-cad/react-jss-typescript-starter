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
  '/dist/react-jss-typescript-starter/',
  express.static('../build', {
    fallthrough: false, // force 404 for unknown assets under /dist/react-jss-typescript-starter/
  })
);

// For any other requests, we render app routes server-side and return them
server.use('*', scProxy(renderView, config, urlRouteParser));

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
