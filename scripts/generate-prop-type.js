/* eslint-disable no-throw-literal,no-console */

const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  throw 'Component name was not passed.';
}

if (!/^[A-Z][A-Za-z0-9-]+$/.test(componentName)) {
  throw 'Component name should start with an uppercase letter and contain only letters and numbers.';
}

const componentRootPath = 'src/components';

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
  const propFileContent = `
  export interface ${componentName}Properties {
    fields: {
      ${ fields.map(field => `${field.name}: string; // ${field.type}\n`) }
    }
  }
  `;
  const outputDirectoryPath = path.join(componentRootPath, componentName);
  const outputFilePath = path.join(outputDirectoryPath, 'props.ts');
  fs.writeFileSync(outputFilePath, propFileContent, 'utf8');
  return outputFilePath;
});


