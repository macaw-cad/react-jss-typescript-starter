#!/usr/bin/env node
"use strict";

const fs = require('fs');
const path = require('path');
const envGenerator = require('./generate-env');

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const disconnected = process.argv.some((arg) => arg === '--disconnected');

const configOverride = { };
const envSettings = envGenerator(configOverride, disconnected);
let dotEnvContent = '';
for(var propertyName in envSettings) {
  dotEnvContent += `${propertyName}=${envSettings[propertyName]}\n`;
}

dotEnvContent += 'BROWSER=Chrome\n';
const filename = disconnected ? '.env.disconnected' : '.env.connected';
console.log(`Writing ${filename}`);
fs.writeFileSync(filename, dotEnvContent, { encoding: 'utf8' });

/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
