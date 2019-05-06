// this file is imported by default prior to executing the jss manifest command
// use this to enable transpilation or any other pre-manifest configurations that are needed.
const path = require('path');
process.env['TS_NODE_PROJECT'] = path.resolve(__dirname, './tsconfig.json');
console.log(`Enabling TypeScript transpilation for the manifest using configuration '${process.env['TS_NODE_PROJECT']}'...`);
require('ts-node/register');
