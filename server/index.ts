import express from 'express';
import compression from 'compression';  // compresses requests
import scProxy from '@sitecore-jss/sitecore-jss-proxy';
import { renderView, urlRouteParser } from '../server.bundle/server';
import { setDevelopmentEnvironmentVariables, logEnvironmentVariables} from './setEnvironment'; 
import { getSitecoreProxyConfiguration} from './sitecoreProxyConfiguration';

// set all required environment variables basen on configuration in package.json and scjssconfig.json
if (process.env.NODE_ENV == 'development') {
  setDevelopmentEnvironmentVariables(); 
}
logEnvironmentVariables();

const config = getSitecoreProxyConfiguration();

const server = express();
const port = process.env.PORT || 3001;
// enable gzip compression for appropriate file types
server.use(compression());

// turn off x-powered-by http header
server.settings['x-powered-by'] = false;

// Serve static app assets from local /dist folder
server.use(
  `/dist/${process.env.SITECORE_JSS_APP_NAME}/`,
  express.static('../build', {
    fallthrough: false, // force 404 for unknown assets under /dist/<appName>/
  })
);

console.log("TARGETCONFIG BEFORE:", config);

// For any other requests, we render app routes server-side and return them
server.use('*', scProxy(renderView, config, urlRouteParser));

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
