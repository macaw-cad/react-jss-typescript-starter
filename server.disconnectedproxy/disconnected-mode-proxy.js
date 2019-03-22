/*
  When the app runs in disconnected mode, and Sitecore is not present, we need to give
  the app copies of the Sitecore APIs it depends on (layout service, dictionary service, content service)
  to talk to so that the app can run using the locally defined disconnected data.

  This is accomplished by spinning up a small Express server that mocks the APIs, and let
  the web server proxy requests to the API paths to this express instance.
*/

/* eslint-disable no-console */

const fs = require('fs');
const Express = require('express');
const { createDisconnectedDictionaryService, createDisconnectedLayoutService } = require('@sitecore-jss/sitecore-jss-dev-tools');

function loadManifestSync(language) {
  const manifestPath = `${process.cwd()}/sitecore/manifest/${language}/sitecore-import.json`;

  if (!fs.existsSync(manifestPath)) {
    throw(`Sitecore manifest file '${manifestPath}' is missing`);
  }

  try {
    const manifestInstance = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifestInstance;
  } catch(error) {
    throw(`Sitecore manifest file '${manifestPath}' could not be processed: ${error}`);
  }
}

let manifestInstance = loadManifestSync('en');
const layoutService = createDisconnectedLayoutService({
  manifest: manifestInstance
});

// creates a fake version of the Sitecore Dictionary Service that is powered by the disconnected manifest file
const dictionaryService = createDisconnectedDictionaryService({
  manifest: manifestInstance,
  manifestLanguageChangeCallback: (language) => {
    const newManifest = loadManifestSync(language); // TODO: only useful for single user?
    layoutService.updateManifest(newManifest);
    dictionaryService.updateManifest(newManifest);
  }
});

const app = Express();
app.disable('etag'); // disable returning 304 - sitecore-jss-proxy throws error when receiving 304

// attach the disconnected service mocking middleware to express
app.use('/assets', Express.static(`${process.cwd()}/assets`));
app.use('/data/media', Express.static(`${process.cwd()}/data/media`));
app.use('/sitecore/api/layout/render', layoutService.middleware);
app.use('/sitecore/api/jss/dictionary/:appName/:language', dictionaryService.middleware);

app.listen(3042);

console.log(`JSS Disconnected-mode Proxy is listening on port 3042`);