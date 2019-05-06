import { ReactAppProcessEnv } from './types/react-app-env';

export class Environment {
    public static get isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }

    // Are we on the server? Note that sometimes loibs define windows as {}, so extra checks are needed.
    public static get isServer(): boolean {
        return typeof window === 'undefined' ||
        (Object.keys(window).length === 0 && window.constructor === Object);
    }
    
    public static get serverUrl(): string {
        return `${window.location.protocol}//${window.location.host}`;
    }

    public static get homeUrl(): string {
        // return 'https://www.mysite.com';
        return `${window.location.protocol}//${window.location.host}`;
    }

    public static get reactAppProcessEnv(): ReactAppProcessEnv {
        const typedEnv =  process.env as unknown as ReactAppProcessEnv;
        // console.log('Typed env: ', typedEnv);
        return typedEnv;
    }
}