/* eslint-disable no-throw-literal,no-console */

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const manifest = require('@sitecore-jss/sitecore-jss-manifest');
const CommonFieldTypes = manifest.CommonFieldTypes;
const ts = require('typescript');

const componentName = process.argv[2];

if (!componentName) {
  throw 'Component name was not passed.';
}

if (!/^[A-Z][A-Za-z0-9-]+$/.test(componentName)) {
  throw 'Component name should start with an uppercase letter and contain only letters and numbers.';
}

const componentRootPath = 'src/jsscomponents';
const componentPath = path.join(__dirname, `../sitecore/definitions/components/${ componentName }.sitecore.ts`);

console.log(`Transforming: ${componentPath}`);

fs.readFile(componentPath, 'utf8', (err, source) => {
  if (err) {
    console.error(err);
    return;
  }
  let transform = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
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
  if (fields.some(f => f.type === CommonFieldTypes.Image)) {
    imports.push('import { ImageFieldValue } from \'@sitecore-jss/sitecore-jss-manifest\'');
  }
  if (fields.some(f => f.type === CommonFieldTypes.Image)) {
    imports.push('import { LinkFieldValue } from \'@sitecore-jss/sitecore-jss-manifest\'');
  }

  const camelCaseComponentName = _.upperFirst(_.camelCase(componentName));
  const propFileContent = `
${ imports.join('\n') }${imports.length ? '\n' : '' }
export interface ${camelCaseComponentName}Props {
  fields: ${camelCaseComponentName}Fields
}

export interface ${camelCaseComponentName}Fields {
${ fields.map(field => `  ${field.name}: ${getType(field.type)}; // CommonFieldTypes: ${field.type}`).join('\n') }
}\n
`;
  console.log(propFileContent);
  const outputDirectoryPath = path.join(componentRootPath, componentName);
  const outputFilePath = path.join(outputDirectoryPath, camelCaseComponentName + '.models.ts');
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
      tsType = 'LinkFieldValue'
      break;
    case CommonFieldTypes.Image:
      tsType = 'ImageFieldValue'
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