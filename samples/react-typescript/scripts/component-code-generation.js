"use strict";

/* eslint-disable no-throw-literal,no-console */

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const manifest = require('@sitecore-jss/sitecore-jss-manifest');
const CommonFieldTypes = manifest.CommonFieldTypes;
const ts = require('typescript');


function generateJssComponentPropsFromDefinition(componentName, componentDefinitionPath, jsscomponentsPath) {
  const componentPath = path.join(componentDefinitionPath, `${ componentName }.sitecore.ts`);

  console.log(`Transforming: ${componentPath}`);

  fs.readFile(componentPath, 'utf8', (err, source) => {
    if (err) {
      console.error(err);
      return;
    }
    source = source.replace('../../../package.json', s => {
      console.log(`s: ${s}`);
      let fullPath = path.resolve(componentDefinitionPath, s);
      fullPath = fullPath.replace(/\\/g, '\\\\');
      console.log(`fullPath: ${fullPath}`);
      return fullPath;
    });

    let transform = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        resolveJsonModule: true
      },
      componentPath
    });

    const code = eval(transform.outputText);

    let resultComponentDefinition = null;
    let resultRouteDefinition = null;
    let resultTemplateDefinition = null;
    code({
      addComponent: (componentDefinition) => resultComponentDefinition = componentDefinition,
      addRoute: (routeDefinition) => resultRouteDefinition = routeDefinition,
      addRouteType: (templateDefinition) => resultTemplateDefinition = templateDefinition,
    });
    let fields = [];
    if(resultComponentDefinition && resultComponentDefinition.fields) {
      fields = fields.concat(resultComponentDefinition.fields);
    }
    if (resultRouteDefinition && resultRouteDefinition.fields) {
      fields = fields.concat(resultRouteDefinition.fields);
    }
    if (resultTemplateDefinition && resultTemplateDefinition.fields) {
      fields = fields.concat(resultTemplateDefinition.fields);
    }

    console.log('Found fields: ', fields);
    const imports = [];
    imports.push('import { Field } from \'@sitecore-jss/sitecore-jss\';');
    if (fields.some(f => f.type === CommonFieldTypes.Image)) {
      imports.push('import { ImageField } from \'@sitecore-jss/sitecore-jss-react/types/components/Image\';');
    }
    if (fields.some(f => f.type === CommonFieldTypes.GeneralLink)) {
      imports.push('import { LinkField } from \'@sitecore-jss/sitecore-jss-react/types/components/Link\';');
    }
    if (fields.some(f => f.type === CommonFieldTypes.File)) {
      imports.push('import { FileField } from \'@sitecore-jss/sitecore-jss-react/types/components/File\';');
    }

    const camelCaseComponentName = _.upperFirst(_.camelCase(componentName)).replace(/\W/g, '');
    let propFileContent = `// This file is generated. Regenerate using: node scripts/generate-view-model.js --component ${componentName}\n`;
    if (imports.length > 0) {
      propFileContent += imports.join('\n') + '\n';
    }
      
    propFileContent += `export interface ${camelCaseComponentName}BaseProps {\n`;
    if (fields && fields.length > 0) {
      propFileContent += `  fields: ${camelCaseComponentName}Fields;\n`;
    }
    propFileContent += '}\n';

    if (fields && fields.length > 0) {
      propFileContent += `\nexport interface ${camelCaseComponentName}Fields {
${ fields.map(field => `  ${field.name}: ${getType(field.type)}; // CommonFieldTypes: ${field.type}`).join('\n') }
}`;
    }
    // console.log(propFileContent);
    const outputDirectoryPath = path.join(jsscomponentsPath, componentName);
    const outputFilePath = path.join(outputDirectoryPath, camelCaseComponentName + '.props.ts');
    fs.writeFileSync(outputFilePath, propFileContent, { encoding:'utf8', flag:'w' });
    console.log(`Written to ${outputFilePath}`);
    return outputFilePath;
  });
}

function getType(sitecoreFieldType) {
  let tsType = '';

  switch (sitecoreFieldType) {
    case CommonFieldTypes.DateTime:
    case CommonFieldTypes.Date:
    case CommonFieldTypes.Checkbox:
    case CommonFieldTypes.Number:
    case CommonFieldTypes.ItemLink:
    case CommonFieldTypes.ContentList:
    case CommonFieldTypes.MultiLineText:
    case CommonFieldTypes.SingleLineText:
    case CommonFieldTypes.RichText:
      tsType = 'Field';
      break;
    case CommonFieldTypes.GeneralLink:
      tsType = 'LinkField';
      break;
    case CommonFieldTypes.Image:
      tsType = 'ImageField';
      break;
    case CommonFieldTypes.File:
      tsType = 'FileField';
      break;
    default:
      tsType = 'Field';
      break;
  }

  return tsType;
}

module.exports = {
  generateJssComponentPropsFromDefinition
};