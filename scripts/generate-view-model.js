#!/usr/bin/env node
"use strict";

/* eslint-disable no-throw-literal,no-console */

const componentCodeGeneration = require('./component-code-generation');

const componentName = process.argv[2];

if (!componentName) {
  throw 'Component name was not passed.';
}

if (!/^[A-Z][A-Za-z0-9-]+$/.test(componentName)) {
  throw 'Component name should start with an uppercase letter and contain only letters and numbers.';
}

componentCodeGeneration.generateJssComponentPropsFromDefinition(componentName);