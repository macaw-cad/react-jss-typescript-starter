// Set the required environment variables for the NodeJS based Express server doing server-side rendering
import * as fs from 'fs';
import * as path from'path';
import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';


const environmentVariables = [
    { name: "REACT_APP_SITECORE_JSS_APP_NAME", mandatory: true },
    { name: "REACT_APP_SITECORE_API_KEY", mandatory: true },
    { name: "REACT_APP_SITECORE_API_HOST", mandatory: true },
    { name: "REACT_APP_SITECORE_LAYOUT_SERVICE_ROUTE", mandatory: true },
    { name: "REACT_APP_SITECORE_DICTIONARY_SERVICE_ROUTE", mandatory: true },
    { name: "REACT_APP_SITECORE_GRAPHQL_ENDPOINT", mandatory: true },
    { name: "REACT_APP_SITECORE_DEFAULT_LANGUAGE", mandatory: true },
    { name: "REACT_APP_SITECORE_PATH_REWRITE_EXCLUDE_ROUTES", mandatory: false },
    { name: "REACT_APP_SITECORE_ENABLE_DEBUG", mandatory: true },
    { name: "REACT_APP_SITECORE_CONNECTED", mandatory: true },
];

export function setDevelopmentEnvironmentVariables(connected: boolean): void  {
    const envPath = path.resolve(process.cwd(), `./.env.development.${(connected? 'connected' : 'disconnected')}`);
    if (!fs.existsSync(envPath)) {
        const error = `Expected file ${envPath} containing development environment setting for ${(connected? 'connected' : 'disconnected')} mode is missing`;
        throw error;
    }

    const result: dotenv.DotenvResult = dotenv.config({ path: envPath, debug: true });

    if (result.error) {
        throw result.error;
    }

    dotenvExpand(result);
    console.log(result.parsed)
}

export function validateEnvironmentVariables() {
    environmentVariables.map(e => {
        if (!process.env[e.name] && e.mandatory) {
            throw `Missing mandatory environment variable ${e.name}`; 
        }
    });
}

export function logEnvironmentVariables(): void {
    console.log("Running with following environment variable settings:");
    console.log("=====================================================");
    environmentVariables.map(e => {
        console.log(`${e.name}=${process.env[e.name]}`);
    });
}
