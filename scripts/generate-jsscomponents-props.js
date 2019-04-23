#!/usr/bin/env node
"use strict";

const fs = require('fs');
const path = require('path');
const prog = require('caporal');

const componentCodeGeneration = require('./component-code-generation');

const jsscomponentsPath = path.join(__dirname, '../src/jsscomponents');
const componentDefinitionPath = path.join(__dirname, '../sitecore/definitions/components');

prog
  .version('1.0.0')
  .description('Generate jsscomponent props')
  .option('--component <componentName>', 'The component definition in sitecore/definitions/components (without .sitecore.ts extension)', prog.STRING, undefined)
  .option('--all', 'Generate for all component definitions in sitecore/definitions/components', prog.BOOLEAN, false)
  .action(function(args, options, logger) {
    let componentNames = [];
    if (options.all) {

      fs.readdirSync(componentDefinitionPath)
        .filter((componentDefinitionFileName) => componentDefinitionFileName.includes('.sitecore.ts'))
        .forEach((componentDefinitionFileName) => {
          const componentName = componentDefinitionFileName.replace('.sitecore.ts', '');
          componentNames.push(componentName);
        });
      }
      else {
      if (!options.component) {
        throw 'Component name not specified. Provide --component <MyComponent>';
      } else {
        if (!/^[A-Z][A-Za-z0-9-]+$/.test(options.component)) {
          throw 'Component name should start with an uppercase letter and contain only letters, numbers and dashes.';
        }

        componentNames.push(options.component);
      }
    }

    componentNames.forEach((componentName) => {
      logger.info(`--- Processing component definition '${componentName}'`);
      componentCodeGeneration.generateJssComponentPropsFromDefinition(componentName, componentDefinitionPath, jsscomponentsPath);
      
    })
  });

  prog.parse(process.argv);