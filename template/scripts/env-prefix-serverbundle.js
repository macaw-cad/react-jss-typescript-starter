#!/usr/bin/env node
"use strict";

const fs = require('fs');
const path = require('path');
const envGenerator = require('./generate-env');

const serverBundleToPrefix = 'build/server.bundle.js';

if (!fs.existsSync(serverBundleToPrefix)) {
  throw `Server bundle '${serverBundleToPrefix}' does not exist. Build server bundle first.`;
}

/*
  PREFIX SERVER BUNDLE WITH ENVIRONMENT VARIABLE SETTINGS
  The server bundle contains all React code and components that can be used in
  the Sitecore experience editor. We only use the server bundle in the experience
  editor, the NodeJS Express based server does embed all required code for SSR
  rendering.
  
  After building the server bundle run this script to modify the server bundle
  by settings the required environment variables (to the settings as configured
  within de development environment). This is required because at server-side all 
  configuration of the code is done through environment variables.
  
  Because the same server bundle could be deployed to other servers with other 
  settings the environment variable is only set if the environment variable has 
  no value yet. For other deployments these environment variables can be 
  configured as described in https://jss.sitecore.com/docs/techniques/ssr/configuring-and-debugging-ssr.
*/

// Server bundle is always for connected mode
const configOverride = { };
const envSettings = envGenerator(configOverride, false);
let envSettingsContent = '';
for(var propertyName in envSettings) {
  envSettingsContent += `if (!process.env.${propertyName}) process.env.${propertyName}='${envSettings[propertyName]}';\n`;
}

console.log(`Prefixing '${serverBundleToPrefix}' with code to initialize environment settings (without override):`);
for(var propertyName in envSettings) {
  console.log(`- process.env.${propertyName}='${envSettings[propertyName]}';`);
}
let currentFileData = fs.readFileSync(serverBundleToPrefix, {
  encoding: 'utf8',
  mode: 438 /*=0666*/
});
fs.writeFileSync(serverBundleToPrefix, envSettingsContent + currentFileData, {
  encoding: 'utf8',
  mode: 438, /*=0666*/
  flags: 'w'
});
console.log(`File '${serverBundleToPrefix}' is updated.`)
