#!/usr/bin/env node
"use strict";

const envGenerator = require('./generate-env');

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

const configOverride = { };
envGenerator(configOverride, disconnected);

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
