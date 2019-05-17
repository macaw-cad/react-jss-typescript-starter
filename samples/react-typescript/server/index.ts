import * as fs from 'fs';
import * as express from 'express';
import compression from 'compression';  // compresses requests
import scProxy from '@sitecore-jss/sitecore-jss-proxy';
import { renderView, urlRouteParser } from '../server.bundle/server';
import { getSitecoreProxyConfiguration } from './sitecoreProxyConfiguration';
import { ProxyConfig } from '@sitecore-jss/sitecore-jss-proxy/types/ProxyConfig';
import dotenv from 'dotenv';

const environmentVariables = [
  { name: 'REACT_APP_NAME', mandatory: true },
  { name: 'REACT_APP_APPINSIGHTS_KEY', mandatory: true },
  { name: 'REACT_APP_BUILDVERSION', mandatory: true },
  { name: 'REACT_APP_ENVIRONMENT', mandatory: true },
  { name: 'REACT_APP_ENVIRONMENTCONNECTIONS', mandatory: true },
  { name: 'REACT_APP_ADDITIONALSETTINGS', mandatory: true },
  { name: 'REACT_APP_SITECORE_JSS_APP_NAME', mandatory: true },
  { name: 'REACT_APP_SITECORE_API_KEY', mandatory: true },
  { name: 'REACT_APP_SITECORE_API_HOST', mandatory: true },
  { name: 'REACT_APP_SITECORE_DEFAULT_LANGUAGE', mandatory: true },
  { name: 'REACT_APP_SITECORE_PATH_REWRITE_EXCLUDE_ROUTES', mandatory: false },
  { name: 'REACT_APP_SITECORE_ENABLE_DEBUG', mandatory: true },
  { name: 'REACT_APP_SITECORE_CONNECTED', mandatory: true },
];

function logEnvironmentVariables(): void {
  console.log('Running with following environment variable settings:');
  console.log('=====================================================');
  environmentVariables.map(e => {
    console.log(`${e.name}=${process.env[e.name]}`);
  });
}

function validateEnvironmentVariables(): boolean {
  let valid = true;
  environmentVariables.map(e => {
    if (!process.env[e.name] && e.mandatory) {
      valid = false;
      console.log(`Missing mandatory environment variable ${e.name}`);
    }
  });
  return valid;
}

function loadEnvironmentVariables(envCmdPath: any): void {
  if (!fs.existsSync(envCmdPath)) {
    const error = `Expected file ${envCmdPath} containing environment setting in 'env-cmd' format`;
    throw error;
  }
  const result: dotenv.DotenvResult = dotenv.config({ path: envCmdPath, debug: true });
  if (result.error) {
    throw result.error;
  }
}

function prepServer(expressInstance: express.Express, config: ProxyConfig, port: number): void {
  // enable gzip compression for appropriate file types
  expressInstance.use(compression());

  // turn off x-powered-by http header
  expressInstance.settings['x-powered-by'] = false;

  // Ignore (204 - no content) requests to /sockjs-node/ - is for development tooling client-side
  expressInstance.use('/sockjs-node/', (req, res) => res.status(204));

  // Serve static app assets from local /dist folder
  expressInstance.use(
    `/dist/${process.env.REACT_APP_SITECORE_JSS_APP_NAME}/`,
    express.static('./build', {
      fallthrough: false, // force 404 for unknown assets under /dist/<appName>/
    })
  );

  // For any other requests, we render app routes server-side and return them
  expressInstance.use('*', scProxy(renderView, config, urlRouteParser));

  expressInstance.listen(port, () => {
    console.log(`Web server listening on port ${port}!`);
  });
}

function runServer(): void {
  const config: ProxyConfig = getSitecoreProxyConfiguration();
  const app = express();
  const port: number = 3001;

  // Example of serve static files from public folder
  // app.use('/xyz', express.static(path.join(process.cwd(), Environment.isProduction? 'build/xyz' : '/public/xyz')));

  app.use(compression());

  // turn off x-powered-by http header
  app.settings['x-powered-by'] = false;

  // Ignore (204 - no content) requests to /sockjs-node/ - is for development tooling client-side
  app.use('/sockjs-node/', (req, res) => res.status(204));

  // Serve static app assets from local /dist folder
  app.use(
    `/dist/${process.env.REACT_APP_SITECORE_JSS_APP_NAME}/`,
    express.static('./build', {
      fallthrough: false, // force 404 for unknown assets under /dist/<appName>/
    })
  );

  // For any other requests, we render app routes server-side and return them
  app.use('*', scProxy(renderView, config, urlRouteParser));

  app.listen(port, () => {
    console.log(`Web server listening on port ${port}!`);
  });
}

// Externally set environment variables or pass --envCmd <path> 
// with environment variable settings in env-cmd format.
if (process.argv.length > 2) {
  if (process.argv[2] === '--envCmd' && process.argv.length >= 3) {
    // File with environment settings to use in env-cmd format'
    const envCmdFilePath = process.argv[3];
    loadEnvironmentVariables(envCmdFilePath);
  }
}
if (!validateEnvironmentVariables()) {
  console.log('[EXIT]');
  process.exit(1);
}

logEnvironmentVariables();
console.log(`Current working directory: ${process.cwd()}`);

runServer();