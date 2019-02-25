const configGenerator = require('./generate-config');

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const disconnected = process.argv.some((arg) => arg === '--disconnected');

/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
const port = process.env.PORT || 3000;
// SvdO: we don't want sitecoreApiHost to be set when disconnected, because we run onn
// both http://localhost:3000 and http://localhost:3001 when running npm run serve.
// Keep the path relative to work in both situations
const configOverride = disconnected ? { sitecoreApiHost: '' /*`http://localhost:${port}`*/ } : null;
configGenerator(configOverride);

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
