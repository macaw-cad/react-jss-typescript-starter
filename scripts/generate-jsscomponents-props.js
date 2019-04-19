#!/usr/bin/env node
"use strict";

const fs = require('fs');
const prog = require('caporal');

const componentCodeGeneration = require('./component-code-generation');

prog
  .version('1.0.0')
  .description('Generate jsscomponent props')
  .option('--component <componentName>', 'The component definition in sitecore/definitions/components (without .sitecore.ts extension)', prog.STRING, undefined)
  .option('--all', 'Generatefor all component definitions in sitecore/definitions/components', prog.BOOLEAN, false)
  .action(function(args, options, logger) {
    let componentNames = [];
    if (options.all) {

      const sitecoreDefinitionsComponentsPath = 'sitecore/definitions/components';
      fs.readdirSync(sitecoreDefinitionsComponentsPath)
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
      componentCodeGeneration.generateJssComponentPropsFromDefinition(componentName);
      
    })
  });

  prog.parse(process.argv);