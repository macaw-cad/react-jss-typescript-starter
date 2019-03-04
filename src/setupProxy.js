const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  const isDisconnected = /localhost/i.test(process.env.REACT_APP_SITECORE_API_HOST);

  if (isDisconnected) {
    // when disconnected we proxy to the local faux layout service host,
    // see scripts/disconnected-mode-proxy.js
    const proxyUrl = `http://localhost:${process.env.PROXY_PORT || 3042}/`;
    app.use(proxy('/sitecore', { target: proxyUrl }));
    app.use(proxy('/data/media', { target: proxyUrl }));
  } else {
    // when in connected mode we want to proxy Sitecore paths
    // off to Sitecore

    app.use(proxy('/sitecore', { target: process.env.REACT_APP_SITECORE_API_HOST }));
    // media items
    app.use(proxy('/-', { target: process.env.REACT_APP_SITECORE_API_HOST }));
    // visitor identification
    app.use(proxy('/layouts', { target: process.env.REACT_APP_SITECORE_API_HOST }));
  }
};
