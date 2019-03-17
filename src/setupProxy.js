// This proxy configuration is used by create react app to modify the proxy workings.
// See: https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
// Must be implementated in plain JavaScript.

const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  const isDisconnected = process.env.REACT_APP_SITECORE_CONNECTED === 'false';

  if (isDisconnected) {
    console.log("==== Configuring Create React App proxy for disconnected mode");

    // when disconnected we proxy to the local faux layout service host,
    // see scripts/disconnected-mode-dev-proxy.js and server.disconnectedproxy\disconnected-mode-proxy.js
    const proxyUrl = 'http://localhost:3042';
    app.use(proxy('/sitecore', { target: proxyUrl }));
    app.use(proxy('/data/media', { target: proxyUrl }));
  } else {
    console.log("==== Configuring Create React App proxy for connected mode");

    // when in connected mode we want to proxy Sitecore paths off to Sitecore

    app.use(proxy('/sitecore', { target: process.env.REACT_APP_SITECORE_API_HOST }));
    // media items
    app.use(proxy('/-', { target: process.env.REACT_APP_SITECORE_API_HOST }));
    // visitor identification
    app.use(proxy('/layouts', { target: process.env.REACT_APP_SITECORE_API_HOST }));
  }
};
