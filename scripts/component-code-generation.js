"use strict";

/* eslint-disable no-throw-literal,no-console */

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const manifest = require('@sitecore-jss/sitecore-jss-manifest');
const CommonFieldTypes = manifest.CommonFieldTypes;
const ts = require('typescript');

const componentRootPath = 'src/jsscomponents';

function generateJssComponentPropsFromDefinition(componentName) {
  const componentPath = path.join(__dirname, `../sitecore/definitions/components/${ componentName }.sitecore.ts`);

  console.log(`Transforming: ${componentPath}`);

  fs.readFile(componentPath, 'utf8', (err, source) => {
    if (err) {
      console.error(err);
      return;
    }
    let transform = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS
      }
    });
    const code = eval(transform.outputText);
    let result = null;
    code({
      addComponent: (component) => result = component
    });
    const fields = result.fields;
    if (!fields) {
      return;
    }
    console.log('Found fields: ', fields);
    const imports = [];
    imports.push('import { ContentFieldValue } from \'@sitecore-jss/sitecore-jss-manifest\';');
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
    const propFileContent = `// This file is generated. Regenerate using: node scripts/generate-view-model.js ${componentName}
${ imports.join('\n') }${imports.length ? '\n' : '' }
export interface ${camelCaseComponentName}Props {
  fields: ${camelCaseComponentName}Fields;
}

export interface ${camelCaseComponentName}Fields {
${ fields.map(field => `  ${field.name}: ${getType(field.type)}; // CommonFieldTypes: ${field.type}`).join('\n') }
}
`;
    // console.log(propFileContent);
    const outputDirectoryPath = path.join(componentRootPath, componentName);
    const outputFilePath = path.join(outputDirectoryPath, camelCaseComponentName + '.models.ts');
    fs.writeFileSync(outputFilePath, propFileContent, 'utf8');
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