// This proxy configuration is used by create react app to modify the proxy workings.
// See: https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
// Must be implementated in plain JavaScript.

const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  const isDisconnected = process.env.REACT_APP_SITECORE_CONNECTED === 'false';
  const logLevel = process.env.REACT_APP_SITECORE_ENABLE_DEBUG == 'true'? 'debug' : 'info'; 

  if (isDisconnected) {
    console.log("==== Configuring Create React App proxy for disconnected mode");

    // when disconnected we proxy to the local faux layout service host,
    // see scripts/disconnected-mode-dev-proxy.js and server.disconnectedproxy\disconnected-mode-proxy.js
    const proxyUrl = 'http://localhost:3042';
    app.use(proxy('/sitecore', { target: proxyUrl, changeOrigin: true, logLevel: logLevel }));
    app.use(proxy('/data/media', { target: proxyUrl, changeOrigin: true, logLevel: logLevel }));
  } else {
    console.log("==== Configuring Create React App proxy for connected mode");

    // when in connected mode we want to proxy Sitecore paths off to Sitecore

    app.use(proxy('/sitecore', { target: process.env.REACT_APP_SITECORE_API_HOST, changeOrigin: true, logLevel: logLevel }));
    // media items
    app.use(proxy('/-', { target: process.env.REACT_APP_SITECORE_API_HOST, changeOrigin: true, logLevel: logLevel }));
    // visitor identification
    app.use(proxy('/layouts', { target: process.env.REACT_APP_SITECORE_API_HOST, changeOrigin: true, logLevel: logLevel }));
  }
};
