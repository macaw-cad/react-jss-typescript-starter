/*
  When the app runs in disconnected mode, and Sitecore is not present, we need to give
  the app copies of the Sitecore APIs it depends on (layout service, dictionary service, content service)
  to talk to so that the app can run using the locally defined disconnected data.

  This is accomplished by spinning up a small Express server that mocks the APIs, and then
  telling the dev server to proxy requests to the API paths to this express instance.
*/

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const Express = require('express');

const { createDefaultDisconnectedServer } = require('@sitecore-jss/sitecore-jss-dev-tools');

const app = Express();
app.disable('etag'); // disable returning 304 - sitecore-jss-proxy throws error when receiving 304

const proxyOptions = {
  server: app,
  appRoot: path.join(__dirname, '..'),
  appName: process.env.REACT_APP_SITECORE_JSS_APP_NAME,
  watchPaths: ['./data'],
  language: process.env.REACT_APP_SITECORE_DEFAULT_LANGUAGE,
  port: 3042,
  onManifestUpdated: (manifest) => {
    const contents = `// Auto-generated to force Hot Module Reloading\nexport default { 'timestamp': '${(new Date()).toISOString()}' };`;
    fs.writeFileSync(`${process.cwd()}/src/HMR.ts`, contents, { encoding: 'utf8' });
    console.log('Manifest data updated. Refresh the browser to see latest content!');
  },
};

// Need to customize something that the proxy options don't support?
// createDefaultDisconnectedServer() is a boilerplate that you can copy from
// and customize the middleware registrations within as you see fit.
// See https://github.com/Sitecore/jss/blob/master/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts
createDefaultDisconnectedServer(proxyOptions);
