const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');
const compression = require('compression');  // compresses requests
const scProxy = require('@sitecore-jss/sitecore-jss-proxy');
const { validateEnvironmentVariables, logEnvironmentVariables} = require('./setEnvironment'); 
const { getSitecoreProxyConfiguration } = require('./sitecoreProxyConfiguration');
const app = require('../build/server.bundle');

function prepServer(expressInstance, config, port) {
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
  expressInstance.use('*', scProxy(app.renderView, config, app.urlRouteParser));

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
// if (process.env.NODE_ENV === 'development') {
//     setDevelopmentEnvironmentVariables(connected); 
// }
validateEnvironmentVariables();
logEnvironmentVariables();

const config = getSitecoreProxyConfiguration();
const server = express();
const port = 3001;

prepServer(server, config, port);
if (process.env.REACT_APP_SITECORE_CONNECTED === 'false') {
  const targetUrl = `http://localhost:3042`;
  console.log(`Sitecore disconnected proxy url: ${targetUrl}`);
  let sitecoreDisconnectedServerProxy = proxy(
    [/*'/assets', '/data/media',*/ '/sitecore/api/layout/render', '/sitecore/api/jss/dictionary'],
    {
      target: targetUrl,
      pathRewrite: (path, req) => {
        console.log(`PATH: ${path}`);
        path = path.replace('sc_apikey=undefined', `sc_apikey=${process.env.REACT_APP_SITECORE_API_KEY}`);
        return path;
      },
      logLevel: 'debug'
    }
  );
  server.use('/assets', express.static(path.join(process.cwd(), 'assets')));
  server.use('/data/media', express.static(path.join(process.cwd(), 'data/media')));

  server.use(sitecoreDisconnectedServerProxy);
}
