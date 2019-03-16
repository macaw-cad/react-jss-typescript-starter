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
| `SITECORE_PRODUCTION_DISCONNECTED`     | Optional. If `true` run disconnected from Sitecore in a production environment. Only used if `NODE_ENV === 'production'`.                         |

## Development scripts

The JSS React Starter Application is configured for TypeScript based development.

### Daily development
Default JSS based development workflow:

`npm start`

All other default JSS based scripts are available as well.

### Check if app is working with server-side rendering
Run the Node based web server with server side rendering in development mode:

`npm run serve`

Build production mode server bundle for deployment to Sitecore:

`npm run build`

### Build web server application

Build the NodeJS server application supporting server-side rendering:

- For development: `npm run build-server:development` (contains source-map)
- For production: `npm run build-server:production` (minified)

Execute the application from the root folder `node build.server/index.js`.

The `index.js` script contains all required code (server bundle with all components is embeded).

Currently the Node web server runs in connected mode. Disconnected mode will come soon.

### Debugging the solution

When debugging the server-side code it might be useful to run just the the front-end in connected or disconnected mode:

- connected mode: `npx env-cmd .env.connected npm run start:react`
- disconnected mode: `npx env-cmd .env.disconnected npm run start:react`

### Ports in use

Sometimes when doing development anbd stopping a running process a port remains still in use. I have this sometimes
when developing disconnected where a dummy layout service is running on port 3042. If this happens to you, you can
kill the process using the (Windows only) command:

`kill-ip.bat 3042`

# Docker

The solution contains scripts to build and run a Docker image containing the app locally.
The `Dockerfile` used to build the Docker image can be found at `Docker/Dockerfile`. The
Dockerfile is a multi-stage Dockerfile that builds the production version of the app and
creates an image containing the app.

The resulting Docker image has the following features:

- Uses Nginx as a reverse proxy (config file: `Docker/nginx.config)
- Uses PM2 as a process manager to utilize all available cores and restart on crashing (config file: `Docker/process.yml`)
- Contains an SSH server that connects to the web-based SSH client of Azure App Services when deployed on an Azure Web App for Containers

The script `Docker/init.sh` is executed when the Docker container starts running.

The configuration files in the `Docker` folder are used on a Linux system. These files could be in DOS
format and must be converted to unix format. This can be done using the command:

`scripts/docker-do.js prepare`

This command only has to be executed if there are issues due to CRLF instead of LF as line endings (see bottom right when opening in Visual Studio Code).
 
To build the Docker image:

`scripts/docker-do.js build`

To run the Docker image locally:

`scripts/docker-do.js run [--port <portnumber>] [--disconnected] [--debug]`

The default port is 8888, so the website will be available on `http://localhost:8888`.

The `run` script does two things:

- Kill a running previous image if needed
- Expose the Sitecore layout service host as defined in `scjssconfig.json` through [Ngrok](https://ngrok.com/) because an IIS hosted website with hostname binding on port 80 is not visible from a locally running Docker container
- Start the server application with server-side rendering on `http://localhost:8888`
- **NOT WORKING YET**: Run disconnected from Sitecore when ``--disconnected`` is specified. In this case the `data` folder is used.

All output of the running container is provided in the terminal window. Note that if you do CTRL-C the output stops, but the container keeps running in the background.

NOTE: the /graphql page does not work on refresh in Docker container (to be solved)``
# References

- [JSS Documentation](https://jss.sitecore.com/docs)

See the following blog posts:

- [Render Sitecore 9.1 JSS site using separate node server](https://www.sergevandenoever.nl/sitecore_jss_typescript_node/)
- [Developing React components in TypeScript with Sitecore JSS 9.1](https://www.sergevandenoever.nl/sitecore_jss_typescript/)`