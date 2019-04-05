/* eslint-disable no-throw-literal,no-console */

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const manifest = require('@sitecore-jss/sitecore-jss-manifest');
const CommonFieldTypes = manifest.CommonFieldTypes;

const componentName = process.argv[2];

if (!componentName) {
  throw 'Component name was not passed.';
}

if (!/^[A-Z][A-Za-z0-9-]+$/.test(componentName)) {
  throw 'Component name should start with an uppercase letter and contain only letters and numbers.';
}

const componentRootPath = 'src/jsscomponents';
const componentPath = path.join(__dirname, `../sitecore/definitions/components/${ componentName }.sitecore.js`);

console.log(`Transforming: ${componentPath}`);

fs.readFile(componentPath, 'utf8', (err, file) => {
  const transform = require('babel-core').transform(file, {
    plugins: ['transform-es2015-modules-commonjs'],
  });
  const code = eval(transform.code);
  let result = null;
  code({
    addComponent: (component) => result = component
  });
  const fields = result.fields;
  if (!fields) {
    return;
  }
  console.log('Found fields: ', fields);

  const interfaceName = _.upperFirst(_.camelCase(componentName)) + 'Properties';
  const propFileContent = `
  export interface ${interfaceName} {
    fields: {
      ${ fields.map(field => `${field.name}: ${getType(field.type)}; // CommonFieldTypes: ${field.type}`).join('\n') }
    }
  }
  `;
  console.log(propFileContent);
  const outputDirectoryPath = path.join(componentRootPath, componentName);
  const outputFilePath = path.join(outputDirectoryPath, interfaceName + '.ts');
  fs.writeFileSync(outputFilePath, propFileContent, 'utf8');
  return outputFilePath;
});

function getType(sitecoreFieldType) {
  let tsType = '';
  switch(sitecoreFieldType) {
    case CommonFieldTypes.SingleLineText:
      tsType = 'String'
      break;
    case CommonFieldTypes.MultiLineText:
      tsType = 'String'
      break;
    case CommonFieldTypes.RichText:
      tsType = 'String'
      break;
    case CommonFieldTypes.ContentList:
      tsType = 'any[]'
      break;
    case CommonFieldTypes.ItemLink:
      tsType = 'String'
      break;
    case CommonFieldTypes.GeneralLink:
      tsType = 'String'
      break;
    case CommonFieldTypes.Image:
      tsType = 'String'
      break;
    case CommonFieldTypes.File:
      tsType = 'any'
      break;
    case CommonFieldTypes.Number:
      tsType = 'String'
      break;
    case CommonFieldTypes.Checkbox:
      tsType = 'Boolean'
      break;
    case CommonFieldTypes.Date:
      tsType = 'String'
      break;
    case CommonFieldTypes.DateTime:
      tsType = 'String'
      break;
    default:
      tsType = 'any'
      break;
  }
  return tsType;
}