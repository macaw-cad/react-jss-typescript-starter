import { Environment } from './Environment';

export interface GlobalData {
    appName: string;
    instrumentationKey: string;     // ApplicationInsights instrumentation key
    buildVersion: string;
    environment: string;
    environmentConnections: string;

    sitecoreJssAppName: string;
    sitecoreApiKey: string;
    sitecoreApiHost: string;
    sitecoreDefaultLanguage: string;
    sitecoreEnableDebug: string;    // "true" or "false"
    sitecoreConnected: string;      // "true" or "false"
}

export interface AppWindow extends Window {
    app: GlobalData;
}

export function getGlobalData(): GlobalData {
    return (window as AppWindow).app;
}

/*
REACT_APP_SITECORE_JSS_APP_NAME=react-jss-typescript-starter
REACT_APP_SITECORE_API_KEY={57231674-4CC9-48AA-AFF0-190DB9D68FE1}
REACT_APP_SITECORE_API_HOST=http://react-jss-typescript-starter.dev.local
REACT_APP_SITECORE_DEFAULT_LANGUAGE=en
REACT_APP_SITECORE_ENABLE_DEBUG=true
REACT_APP_SITECORE_CONNECTED=true
REACT_APP_SITECORE_PATH_REWRITE_EXCLUDE_ROUTES=
*/

export function getSitecoreApiKey(): string | undefined {
    return Environment.isServer ? Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_KEY : getGlobalData().sitecoreApiKey;
}

export function getSitecoreApiHost(): string | undefined {
    return Environment.isServer ? Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_HOST : getGlobalData().sitecoreApiHost;
}

export function getSitecoreDefaultLanguage(): string | undefined {
    return Environment.isServer ? Environment.reactAppProcessEnv.REACT_APP_SITECORE_DEFAULT_LANGUAGE : getGlobalData().sitecoreDefaultLanguage;
}

export function getSitecoreLayoutServiceRoute(): string {
    return `/sitecore/api/layout/render/jss`;
}

export function getSitecoreDictionaryServiceRoute(): string {
    let sitecoreApiHost, sitecoreJssAppName, sitecoreApiKey;
    if (Environment.isServer) {
        sitecoreApiHost = Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_HOST;
        sitecoreJssAppName = Environment.reactAppProcessEnv.REACT_APP_SITECORE_JSS_APP_NAME;
        sitecoreApiKey = Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_KEY;
    } else {
        const globalData = getGlobalData();
        sitecoreApiHost = ''; // use proxy on current domain, to prevent CORS issues
        sitecoreJssAppName = globalData.sitecoreJssAppName;
        sitecoreApiKey = globalData.sitecoreApiKey;
    }
    return `${sitecoreApiHost}/sitecore/api/jss/dictionary/${sitecoreJssAppName}/{{lng}}?sc_apikey=${sitecoreApiKey}`;
}

export function getSitecoreGraphqlEndpoint(): string {
    let sitecoreApiHost, sitecoreJssAppName, sitecoreApiKey;
    if (Environment.isServer) {
        sitecoreApiHost = Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_HOST;
        sitecoreJssAppName = Environment.reactAppProcessEnv.REACT_APP_SITECORE_JSS_APP_NAME;
        sitecoreApiKey = Environment.reactAppProcessEnv.REACT_APP_SITECORE_API_KEY;
    } else {
        const globalData = getGlobalData();
        sitecoreApiHost = globalData.sitecoreApiHost;
        sitecoreJssAppName = globalData.sitecoreJssAppName;
        sitecoreApiKey = globalData.sitecoreApiKey;
    }
    const url = `${sitecoreApiHost}/api/${sitecoreJssAppName}?sc_apikey=${sitecoreApiKey}`;
    return url;
}