# react-jss-typescript-starter

The [react-jss-typescript-starter](https://github.com/macaw-interactive/react-jss-typescript-starter) is a starter project for a headless Sitecore 9.1 JSS app with server-side rendering running outside of the Sitecore Content Delivery server. It provides a Node Express based website that can run in a Docker container. It is based on the Sitecore provided sample [node-headless-ssr-proxy](https://github.com/Sitecore/jss/tree/dev/samples/node-headless-ssr-proxy) combined with the starter as scaffolded using `jss create react-jss-typescript-starter react`. The code of the scaffolded site is (mostly) converted to TypeScript and a lot of additional features are added.

Provided features:

- JSS standard (well documented) development flow, but with some enhancements
- JSS component scaffolding using Plop
- data/routes sample Yaml export from Sitecore using Plop
- Development workflow with separation JSS components (as container components)and presentational components (see [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0))
- Storybook for presentational components
- Build task extended to build Node Express based web server with headless server-side rendering
- The setup is using `sitecore-jss-proxy` that enables request proxying to Sitecore CD along with the http cookies to enable tracking, personalization and contact identification
- Dockerfile to build Docker image for running front-end web server

Note that this setup is currently niet officially supported by Sitecore.

## Get started with the current code base

You can fork or clone this repo and work from there or download the zip file with all the code. If you want to start from scratch remove the .git folder, create a new Git repository (the example code below) uses Github) and execute the following commands:

```
git init
git add -A
git commit -m "first commit"
git remote add origin https://github.com/<yourname>/<yourrepo>.git
git push -u origin master
```

If you want to keep the history of the current repo you can also configure a new remote using:

```
git remote set-url origin https://github.com/<yourname>/<yourrepo>.git
git push -u origin master
```

Start working from here.

## Getting started

TODO: What to replace/configure

## Developing - disconnected




## Development - connected

## Development with server-side rendering

When doing development using `npm run start` (for disconnected development) or `npm run start:connected` (connected to Sitecore) all React rendering is executed client side. If you do a view-source you will see the contents of the `public/index.html` file.

It is often a good idea to do development with server-side rendering enabled to check if the code does not use constructs that do not work server-side. A good example of such a construct is accessing browser specific objects like `window`.

Running with server-side rendering can be achieved by deploying the app to Sitecore (`jss deploy app`) and open the site on the url [binding](https://jss.sitecore.com/docs/getting-started/app-deployment#step-1-configure-your-apps-site-and-host-name) as created for the app in Internet Information Server. 

The above command deploys the build artifacts in the folder `build` from your app to the `sitecoreDistPath` (set in your app's `package.json`) under the proxy root path, where the proxy root is the root folder of the website your binding is configured on. Most apps use `/dist/${jssAppName}`, for example `$proxyRoot/dist/${jssAppName}`. Another way to deploy the artifacts to the proxy is to change the `instancePath` in your app's `scjssconfig.json` to the proxy root path, and then use `jss deploy files` within the app to complete the deployment to the proxy.

The above deployment process is slow and requires a Sitecore server to deploy to. 

There is also another approach that can be started with the command `npm run serve`. The app is now served using a Node Express based web server in development mode with the following features:

1. Provides server-side rendering without creating a production build and costly deployments to Sitecore first
2. JavaScript bundle required for running the web-server (including all code for the React components) is rebuilt on each code change
3. The Node Express web server is restarted on each rebuild of the server bundle (uses nodemon)
4. The development build bundle contains sourcemaps for easy debugging of the server-side code
5. The server-side rendering of the code can be debugged directly from Visual Studio Code
6. The server-side rendering can also be done in disconnected mode using `npm run serve:disconnected`

The Node Express web server can be configured through [environment variables](#node_config) as described below.
In `npm run serve` we use `nodemon` which watches for code changes. Nodemon is configured through [nodemon.json](./server/nodemon.json) which contains the environment variabnle settings.
## <a name="node_config"></a>Configuring the Node Express web server

The Node Express web server is configured through environment variables.

| Parameter                              | Description                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SITECORE_API_HOST`                    | Sitecore instance host name. Should be HTTPS in production.                                                                                       |
| `SITECORE_LAYOUT_SERVICE_ROUTE`        | Optional. The path to layout service for the JSS application. Defaults to `/sitecore/api/layout/render/jss`.                                      |
| `SITECORE_API_KEY`                     | The Sitecore SSC API key your app uses.                                                                                                           |
| `SITECORE_PATH_REWRITE_EXCLUDE_ROUTES` | Optional. Pipe-separated list of absolute paths that should not be rendered through SSR. Defaults can be seen in [config.ts](./server/config.ts). |
| `SITECORE_ENABLE_DEBUG`                | Optional. Writes verbose request info to stdout for debugging. Defaults to `false`.                                                               |

## Development scripts

The JSS React Starter Application is configured for TypeScript based development.

Default JSS based development workflow:

`npm start`

All other default JSS based scripts are available as well.

Run the Node based web server with server side rendering in development mode:

`npm run serve`

Build production mode bundles and Node based web server:

`npm run build`

Execute from the folder `build.server` using `node index.js`.

The `index.js` script contains all required code (server bundle with all components is embeded).

Currently the Node web server runs in connected mode. Disconnected mode will come soon.


# References

- [JSS Documentation](https://jss.sitecore.com/docs)

See the following blog posts:

- [Render Sitecore 9.1 JSS site using separate node server](https://www.sergevandenoever.nl/sitecore_jss_typescript_node/)
- [Developing React components in TypeScript with Sitecore JSS 9.1](https://www.sergevandenoever.nl/sitecore_jss_typescript/)