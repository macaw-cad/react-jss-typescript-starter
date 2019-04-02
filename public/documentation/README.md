# Umbrella for Sitecore JSS


            __.|.__ 
        .n887.d8'qb'""-.
      .d88' .888  q8b. '. 
     d8P'  .8888   .88b. \
    d88_._ d8888_.._9888 _\
      '   '    |    '   '____  ____  ___      ___  _______    _______    _______  ___      ___            __
               |        (""  _||_ ""||"" \    /"" ||   _  ""\/""     \  /""    ""||""|    |"" |         /""""\
               |        |   (  ) : | \   \  //   |(. |_)  :)|:        |(: ______)||  |    ||  |         /    \
               |        (:  |  | . ) /\\  \/.    ||:     \/ |_____/   ) \/    |  |:  |    |:  |        /' /\  \
               |         \\ \__/ // |: \.        |(|  _  \\  //      /  // ___)_  \  |___  \  |___    //  __'  \
               |         /\\ __ //\ |.  \    /:  ||: |_)  :)|:  __   \ (:     ""|( \_|:  \( \_|:  \  /   /  \\  \
             '='        (__________)|___|\__/|___|(_______/ |__|  \___) \_______) \_______)\_______)(___/    \___)
  



With the introduction of [Sitecore JavaScript Services](https://jss.sitecore.com/), or JSS for short, Sitecore created an SDK to allow developers to use Sitecore as a headless CMS. Finally website developers are free to build a website using their own technology stack while utilizing the Sitecore platform.

**Umbrella for Sitecore JSS** is our vision on how a website should be developed and hosted while using the JSS SDK and Sitecore as a headless CMS.

## Table of Contents

- [Umbrella for Sitecore JSS](#umbrella-for-sitecore-jss)
  - [Table of Contents](#table-of-contents)
  - [The react-jss-typescript-starter starter kit](#the-react-jss-typescript-starter-starter-kit)
  - [Get started with the current code base](#get-started-with-the-current-code-base)
  - [Development with server-side rendering](#development-with-server-side-rendering)
  - [Configuring the NodeJS Express web server](#configuring-the-nodejs-express-web-server)
  - [Development scripts](#development-scripts)
    - [Daily development](#daily-development)
    - [Check if app is working with server-side rendering](#check-if-app-is-working-with-server-side-rendering)
    - [Build the artifacts for deployment to Sitecore](#build-the-artifacts-for-deployment-to-sitecore)
    - [Build web server application](#build-web-server-application)
  - [Umbrella](#umbrella)
    - [Umbrella.PanTau](#umbrellapantau)
      - [Example output:](#example-output)
    - [Umbrella Sync Script](#umbrella-sync-script)
      - [Usage](#usage)
      - [Options](#options)
    - [Installation](#installation)
    - [API](#api)
      - [Placeholders](#placeholders)
      - [Templates](#templates)
      - [Components](#components)
      - [Content and Media](#content-and-media)
  - [Ports](#ports)
    - [Ports in use](#ports-in-use)
  - [Debugging](#debugging)
    - [Debugging the client-side code](#debugging-the-client-side-code)
    - [Debugging the server-side rendering](#debugging-the-server-side-rendering)
    - [Debugging the Sitecore disconnected mode proxy](#debugging-the-sitecore-disconnected-mode-proxy)
    - [Debugging the webback server bundle build](#debugging-the-webback-server-bundle-build)
    - [Debugging docker build & run scripts](#debugging-docker-build--run-scripts)
  - [Docker](#docker)
  - [Deployment of solution in a Docker container on Azure](#deployment-of-solution-in-a-docker-container-on-azure)
  - [The Azure pipeline Yaml file](#the-azure-pipeline-yaml-file)
  - [Configure the Azure build pipeline](#configure-the-azure-build-pipeline)
  - [Deploy image to Azure Web Apps for Containers](#deploy-image-to-azure-web-apps-for-containers)
  - [References](#references)

## The react-jss-typescript-starter starter kit

At Macaw Interactive we made choices with respect to the front-end development technology stack that we use, and the way we build web applications. Our primary front-end technology stach consists of:

- ReactJS (using Redux where applicable)
- TypeScript
- GraphQL
- Server-side rendering for SEO

For more information on the Macaw Interactive thoughts on technology complemented with an assessment result see the [Macaw Interactive front-end Technology Radar](https://github.com/macaw-interactive/radar).

The [react-jss-typescript-starter](https://github.com/macaw-interactive/react-jss-typescript-starter) is our starter project implementing our **Umbrella for Sitecore JSS** vision ansd tooling: a headless Sitecore 9.1 JSS web application supporting server-side rendering and running outside of the Sitecore Content Delivery server. It provides a NodeJS Express based web site with all the required configuration options to run in a Docker container. This starter is based on the Sitecore provided sample [node-headless-ssr-proxy](https://github.com/Sitecore/jss/tree/dev/samples/node-headless-ssr-proxy) combined with the starter project as scaffolded using the Sitecore JSS CLI with the command `jss create react-jss-typescript-starter react`. The code of the scaffolded site is (mostly) converted to TypeScript and a lot of additional features are added.

Provided features:

- supports the (well documented) JSS standard development flow, but with many enhancements
- JSS component scaffolding using [Plop](https://plopjs.com/), a powerfull scaffolding tool
- data/routes Sitecore Yaml import/export using the [Umbrella](https://github.com/macaw-interactive/umbrella-for-sitecore-jss) tool
- code structure with separation of JSS components (as container components) and presentational components (see [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0))
- [Storybook](https://storybook.js.org/) for presentational components
- build tasks extended to build a headless NodeJS Express based web server with support for server-side rendering
- the web server is using `sitecore-jss-proxy` that enables request proxying to a Sitecore CD along with the http cookies to enable tracking, personalization, contact identification and multivariate testing
- Dockerfile to build a Docker image for running the NodeJS Express based front-end web server
- Docker container completely configurable using environment variables
- extensive documentation

## Get started with the current code base

Fork or clone this repo and work from there, or download the zip file with all the code. If you want to start from scratch remove the .git folder, create a new Git repository (the example code below uses Github) and execute the following commands:

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

The first command to execute next is `jss setup` to create the `scjssconfig.json` file locally. This file is user-specific and is ignored from source-control. Based on the `scjssconfig.json` the development npm scripts create the files `.env.connected` and `.env.disconnected` when needed. These files contain the environment variables with all configuration information. Note that these files are excluded from source control as well (see the `.gitignore` file). 

## Development with server-side rendering

When doing development using `npm run start` (for disconnected development) or `npm run start:connected` (connected to Sitecore) all React rendering is executed client side. If you do a view-source you will see the contents of the `public/index.html` file.

It is often a good idea to do development with server-side rendering enabled to check if the code does not use constructs that do not work server-side. A good example of such a construct is accessing browser specific objects like `window`.

The out-of-the-box approach for running with server-side rendering can be achieved by deploying the app to Sitecore (`jss deploy app`) and open the site on the url [binding](https://jss.sitecore.com/docs/getting-started/app-deployment#step-1-configure-your-apps-site-and-host-name) as created for the app in Internet Information Server. 

The above command deploys the build artifacts in the folder `build` from your app to the `sitecoreDistPath` (set in your app's `package.json`) under the proxy root path, where the proxy root is the root folder of the website your binding is configured on. Most apps use `/dist/${jssAppName}`, for example `$proxyRoot/dist/${jssAppName}`. Another way to deploy the artifacts to the proxy is to change the `instancePath` in your app's `scjssconfig.json` to the proxy root path, and then use `jss deploy files` within the app to complete the deployment to the proxy.

The above deployment process is slow and requires a Sitecore server to deploy to. 

There is also another approach that can be started with the command `npm run serve:connected`. The app is now served using a NodeJS Express based web server in development mode with the following features:

- provides server-side rendering without creating a production build and costly deployments to Sitecore first
- JavaScript bundle required for running the web server (including all code for the React components) is rebuilt on each code change
- the NodeJS Express web server is restarted on each rebuild of the server bundle (uses `nodemon`)
- the development build bundle contains sourcemaps for easy debugging of the server-side code
- the server-side rendering of the code can be debugged directly from Visual Studio Code
- the server-side rendering can also be done in disconnected mode using `npm run serve:disconnected`

The NodeJS Express web server can be configured through [environment variables](#node_config) as described below.
In `npm run serve:disconnected` (or the shorthand `npm run serve`) and `npm run serve:connected` we use `nodemon` which watches for code changes. Nodemon is configured through the `server/nodemon.json` configuration file.

## Configuring the NodeJS Express web server

The NodeJS Express web server is completely configured through environment variables. This enables running the web server in a Docker container, where the running image for dev, test, acceptation and production can be configured through environment variables (or App Settings in case of a deployment to Azure Web Apps for Containers).

The environment variables can be used in NodeJS server code using `process.env.<EnvVariableName>`. Many of the variables are made available at runtime for the client-side code as properties on the global variable `window.app` as `window.app.<name>`.

| Env variable | window.app property | Description |
| --- | --- | --- |
| `NODE_ENV` | N.A. | Either `development` or `production` |
| `REACT_APP_NAME` | `window.app.appName` | Name of the app, in development generation same as `REACT_APP_SITECORE_JSS_APP_NAME` |
| `REACT_APP_APPINSIGHTS_KEY` | `window.app.instrumentationKey` | Azure Applications Insights key |
| `REACT_APP_BUILDVERSION` | `window.app.buildVersion` | Build version, in development generation set to `DevBuild` |
| `REACT_APP_ENVIRONMENT` | `window.app.environment` | Current environment, in development set to `Development` |
| `REACT_APP_ENVIRONMENTCONNECTIONS` | `window.app.environmentConnections` | Summary of environment connections, in development set to `ScDisconnected` in disconnected mode, and to `ScConnected` in connected mode |
| `REACT_APP_ADDITIONALSETTINGS` | `window.app.<setting>` | Additional application settings, in development set to `,ignore:0` to make `index.html` valid |
| `REACT_APP_SITECORE_JSS_APP_NAME` | `window.app.sitecoreJssAppName` | Sitecore app name |
| `REACT_APP_SITECORE_API_KEY` | `window.app.sitecoreApiKey` | The Sitecore SSC API key your app uses |
| `REACT_APP_SITECORE_API_HOST` | `window.app.sitecoreApiHost` | Sitecore instance host name (should be HTTPS in production) when connected, http://localhost:3042 is disconnected |
| `REACT_APP_SITECORE_DEFAULT_LANGUAGE` | `window.app.sitecoreDefaultLanguage` | Default language to use |
| `SITECORE_ENABLE_DEBUG` | `window.app.sitecoreEnableDebug` | Writes verbose request info to stdout for debugging. Defaults to `false` |
| `REACT_APP_SITECORE_CONNECTED` | `window.app.sitecoreConnected` | Optional. If `true` run disconnected from Sitecore in a production environment. Only used if `NODE_ENV === 'production'` |
| `REACT_APP_SITECORE_PATH_REWRITE_EXCLUDE_ROUTES` | N.A. | Optional. Pipe-separated list of absolute paths that should not be rendered through SSR. Defaults can be seen in the file `server/config.ts` |

In development we use the following npm commands:

- `npm run start:disconnected` (shorthand `npm start`)
- `npm run start:connected`
- `npm run serve:disconnected` (shorthand `npm run serve`)
- `npm run serve:connected` 

These commands autogenerate the required environment variable configuration files `.env.disconnected` and `.env.connected`. The values of the environment variables are based on the values as defined in the `scjssconfig.json` file. The `scjssconfig.json` configuration file is generated by the command `jss setup`. 

In the production build the file `.env.production` is used that defines all environment variables as `VARNAME=##VARNAME##`. The resulting `##VARNAME##` values can be replaced during the production build in for example the Azure DevOps build pipeline. All `##VARNAME##` values remaining in `build/index.html` are replaced on runtime when serving the `build/index.html` file from the web server. The replacement values are based on the configured enviroment variables.  

## Development scripts

There are many development scripts that can be found in `package.json`. The most important development scripts are described below.

### Daily development

Default JSS based development workflow:

Disconnected: `npm run start:disconnected` or its short-hand `npm start`

Connected: `npm run start:connected`

All other default JSS based scripts are available as well.

### Check if app is working with server-side rendering

Run the NodeJS Express based web server with server side rendering in development mode:

Disconnected: `npm run serve:disconnected` or its short-hand `npm run serve`

Connected: `npm run serve:connected`

### Build the artifacts for deployment to Sitecore

Build web server and production mode server bundle for deployment to Sitecore:

```npm run build```

The resulting code can be deployed to Sitecore using the command `jss deploy app` as descvrined in the [documentation](https://jss.sitecore.com/docs/getting-started/app-deployment).

### Build web server application

Build the NodeJS Express web server application supporting server-side rendering:

- For development: `npm run build-server:development` (contains source-map)
- For production: `npm run build-server:production` (minified)

Execute the NodeJS Express based web server application from the root folder using `node build.server/index.js`. The `build.server/index.js` script contains all required code. The server bundle with all components is embedded. The web server runs in connected mode is the environment variable `REACT_APP_SITECORE_CONNECTED` is set to `true`, otherwise it runs in disconnected mode.

## Umbrella

### Umbrella.PanTau

The Umbrella.PanTau project adds an extra JSS endpoint: `/sitecore/api/layout/render/umbrella` to your environment. This endpoint is used by the [Umbrella Sync Script][umbrellascript] to extract data from your Sitecore JSS environment.

#### Example output:

```json
{
  "sitecore": {
    "context": {
      "visitorIdentificationTimestamp": 636889392519235300,
      "pageEditing": false,
      "site": {
        "name": "react-jss-typescript-starter"
      },
      "pageState": "normal",
      "language": "en",
      "placeholders": [
        {
          "id": "4cd956d4-a36e-5c78-ab14-3b56f66cb503",
          "name": "footer-address",
          "displayName": "footer-address"
        },
        {
          "id": "c23b835f-a290-5b95-b5d5-e2dbf3ca499e",
          "name": "jss-main",
          "displayName": "Main"
        }
      ],
      "templates": [
        {
          "BaseIDs": [
            "b36ba9fd-0dc0-49c8-bea2-e55d70e6af28"
          ],
          "CustomValues": null,
          "FullName": "Project/react-jss-typescript-starter/App Route",
          "Icon": "Apps/16x16/routes.png",
          "ID": "4e63ea9e-0174-505b-9e6e-82136191959e",
          "Name": "App Route",
          "StandardValueHolderId": "4c235921-3a2f-5f3e-bb91-fc62415c88cf",
          "fields": [
            {
              "id": "d10dc31e-cf38-567f-98d8-655fee342a54",
              "name": "pageTitle",
              "defaultValue": "",
              "type": "Single-Line Text",
              "typeKey": "single-line text",
              "icon": "",
              "isShared": false,
              "inherited": false,
              "templateId": "4e63ea9e-0174-505b-9e6e-82136191959e",
              "templateName": "App Route"
            }
          ]
        }
      ],
      "renderings": [
        {
          "id": "08f9daac-db92-575a-873b-b53cce7de290",
          "name": "ContentBlock",
          "displayName": "Content Block",
          "icon": "Office/16x16/document_tag.png",
          "fields": [
            {
              "id": "037fe404-dd19-4bf7-8e30-4dadf68b27b0",
              "name": "componentName",
              "type": "CommonFieldTypes.SingleLineText"
            }
          ],
          "placeholders": [
            "{C23B835F-A290-5B95-B5D5-E2DBF3CA499E}|jss-main",
            "{11448A04-F955-5B19-A54A-9E0EC07641AF}|jss-reuse-example"
          ]
        }
      ]
    },
    "route": {
      "name": "styleguide",
      "displayName": "styleguide",
      "fields": {
        "pageTitle": {
          "value": "Styleguide | Sitecore JSS"
        }
      },
      "databaseName": "master",
      "deviceId": "fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3",
      "itemId": "ed4692a0-7439-59c4-8451-7a55c061158c",
      "itemLanguage": "en",
      "itemVersion": 1,
      "layoutId": "1e09f9fe-4092-5183-9bd2-6a75c1815c59",
      "templateId": "4e63ea9e-0174-505b-9e6e-82136191959e",
      "templateName": "App Route",
      "placeholders": {
        "jss-main": [
        ]
      }
    }
  }
}
```

### Umbrella Sync Script

The Umbrella Sync Script is a NodeJS script and has to be executed from the root of your JSS project folder:

```bash
node .\scripts\umbrella.js
```

#### Usage

```bash
node .\scripts\umbrella.js sync
```

#### Options

| Switch | Action | 
| --- | --- |
|-t, --templates     | Sync all the templates from Sitecore                 |
|-p, --placeholders  | Sync all the placeholders from Sitecore              |
|-m, --manifests     | Sync all the component manifests from Sitecore       |
|-c, --content       | Sync all the content from your Sitecore JSS website  |

### Installation

> Documentation and sources may change

```bash
git clone https://github.com/macaw-interactive/umbrella-for-sitecore-jss
```

### API

The Umbrella endpoint will output extra data used by the Umbrella NodeJS script. The Umbrella NodeJS script will export data to several sections in your local JSS application.

#### Placeholders

Exports all available placeholders from your JSS Sitecore environment to `<app root>/sitecore/definitions/placeholders.sitecore.js`.

#### Templates

Exports all available templates from your JSS Sitecore environment to `<app root>/sitecore/definitions/templates`.

#### Components

Exports all available components from your JSS Sitecore environment to `<app root>/sitecore/definitions/components`.

#### Content and Media

This will export the content of your routes (pages) to your local JSS development environment and saves it in the `<app root>/data/routes` folder. During the export the script will check for image fields and wil save them to the `<app root>/data/media` folder.

## Ports

When doing development the following ports are used:

- http://localhost:3000: client-side rendered web-site using the create react app development server
- http://localhost:3001: the server-side rendered web-site servered by the NodeJS Express based web server
- http://localhost:3042: the disconnected mode Sitecore proxy

### Ports in use

Sometimes when doing development and stopping a running process a port remains still in use. I have this sometimes
when developing disconnected where a dummy layout service is running on port 3042. If this happens to you, you can
kill the process using the (Windows only) command:

`scripts/kill-ip.bat 3042`

## Debugging

One of the most important things in development is the ability to debug your code in a good way. This starter provides all the required configurations for Visual Studio Code to do debugging to the max!

### Debugging the client-side code

Although debugging if provided in Chrome through the developer tools, it is also possible to do client-side code debugging in Visual Studio Code. To do this install the `Debugger for Chrome` extension first.

To start client-side debugging start the `Client [3000]` debug configuration.


### Debugging the server-side rendering

When debugging the server-side code it might be useful to run just the the front-end in connected or disconnected mode:

- connected mode: `npx env-cmd .env.connected npm run start:react`
- disconnected mode: `npx env-cmd .env.disconnected npm run start:react`

The web server can then be started using the provided debug configurations `Server:disconnected [3001]` and `Server:connected [3001]`. 

### Debugging the Sitecore disconnected mode proxy

In development the script `scripts/disconnected-mode-dev-proxy.js` provides the Sitecore disconnected mode proxy. This script can be debugged in Visual Studio Code by executing the `SC disconnected [3042]` debug configuration.

### Debugging the webback server bundle build

The webpack server-bundle build can be debugged in Visual Studio Code by executing the `server.bundle Webpack` debug configuration.

### Debugging docker build & run scripts

The script `scripts/docker-do.js` can be used to build and run the docker image. This script can be debugged in Visual Studio Code by executing the `docker-do build` and `docker-do run` debug configurations.

## Docker

The starter kit contains scripts to build and run a Docker image containing the complete solution. This Docker image can be run locally or be deployed to a Docker container registry.

The `Dockerfile` used to build the Docker image can be found at `Docker/Dockerfile`. The
Dockerfile is a multi-stage Dockerfile that builds the production version of the solution and
creates an image containing the solution.

The resulting Docker image has the following features:

- uses [Nginx](https://www.nginx.com/) as a reverse proxy (config file: `Docker/nginx.config)
- uses [PM2](http://pm2.keymetrics.io/) as a process manager to utilize all available cores and restart on crashing (config file: `Docker/process.yml`)
- contains an SSH server that connects to the web-based SSH client of Azure App Services when deployed on an Azure Web App for Containers

The script `Docker/init.sh` is executed when the Docker container starts running.

The configuration files in the `Docker` folder are used on a Linux system. These files could be in DOS
format and must be converted to unix format. This can be done using the command:

`node scripts/docker-do.js prepare`

This command only has to be executed if there are issues due to CRLF instead of LF as line endings (see bottom right when opening file in Visual Studio Code).
 
To build the Docker image execute the command:

`node scripts/docker-do.js build`

To run the Docker image locally execute the command:

`node scripts/docker-do.js run [--port <portnumber>] [--disconnected] [--debug]`

The default port is 8888, so the website will be available on `http://localhost:8888`.

The `run` command does the following things:

- kill a running previous container if needed
- expose the Sitecore layout service host as defined in `scjssconfig.json` through [Ngrok](https://ngrok.com/) because an IIS hosted website with hostname binding on port 80 is not visible from a locally running Docker container
- start the NodeJS Express based web server with server-side rendering on `http://localhost:8888`
- run disconnected from Sitecore when `--disconnected` is specified. In this case the `data` folder is used

All output of the running container is provided in the terminal window. Note that if you do CTRL-C the output stops, but the container keeps running in the background. Execute `docker ps` to see the executing Docker container. To kill the running Docker container execute `docker kill <id>`.

The Docker image is completely configurable through environment variables. This means that the same image can be used for every environment (development, test, acceptation, production).

## Deployment of solution in a Docker container on Azure

Any change on the `develop` and `master` branches of the `https://github.com/macaw-interactive/react-jss-typescript-starter` repository are automatically built and deployed as a Linux Docker container running on an Azure Web App for Containers:

- `develop` branch deployed to `https://react-jss-typescript-starter-develop.azurewebsites.net`
- `master` branch deployed to `https://react-jss-typescript-starter.azurewebsites.net`

The resulting web site is configured in disconnected mode, so no Sitecore server or license is required to run the web site.

## The Azure pipeline Yaml file

The following `azure-pipeline.yml` file drives the build of the Docker image and the deployment of the image to the Azure container registry:

```yaml
trigger:
  branches:
    include:
    - master
    - develop

pool:
  vmImage: 'Ubuntu-16.04'

steps:
- checkout: self
  submodules: true
  
- script: |
    docker build -f Docker/Dockerfile -t $(dockerId).azurecr.io/$(imageName) .
    docker login -u $(dockerId) -p $(dockerPassword) $(dockerId).azurecr.io
    docker push $(dockerId).azurecr.io/$(imageName)
  displayName: 'docker build'
```

This Azure pipeline configuration file uses the following environment variables:

| Variable | Purpose | Example |
| --- | --- | --- |
| imageName | The name to tag the Docker image with | For example `react-jss-typescript-starter` |
| dockerId | The name of the Azure container registry | |
| dockerPassword | The password to log in the Azure container registry | |

## Configure the Azure build pipeline

The starter is hosted in a Git repository on Github. Github is bought by Microsoft, and now Github provides integration with Azure and its pipelines for build and deploy. This integration can be enabled through the [Azure Pipelines app](https://github.com/marketplace/azure-pipelines) at the Github marketplace.

After setting up and configuring the Azure Pipelines app for your Github account move over to https://dev.azure.com. In the new configured Azure DevOps organization you can setup new projects. See the [documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/?view=azure-devops) for more details.

Within the project execute the following steps:

1. select `Pipelines` and create a new build pipeline
   ![Create build pipeline](./create-build-pipeline-1.png)
2. select the location of the code repository, in our case GitHub
   ![Select repo location](./create-build-pipeline-2.png)
3. select the repository to use
4. the `azure-pipeline.yml` file will be automatically picked up
5. select `Run` to save it (why? - why can't I specify a name?) - cancel the build, we need to set variables!!
6. select the pipelines, select the new created pipeline, select the dots menu to access the menu and rename the pipeline
   ![Rename pipeline](./rename-build-pipeline.png)
7. select the new created pipeline, select `Edit`, select the dots menu to reach the variable definition screen
8. configure the above described variables
9. run the build

The build will result in a Docker image pushed to the specified Azure container registry with either the tag `$(imageName):develop` or `$(imageName):master`.

## Deploy image to Azure Web Apps for Containers

Deploy image from the Azure container registry to an zure Web App for Containers as described in the article https://docs.microsoft.com/en-us/azure/app-service/containers/tutorial-custom-docker-image. 

## References

- [JSS Documentation](https://jss.sitecore.com/docs)

See the following blog posts:

- [Render Sitecore 9.1 JSS site using separate node server](https://www.sergevandenoever.nl/sitecore_jss_typescript_node/)
- [Developing React components in TypeScript with Sitecore JSS 9.1](https://www.sergevandenoever.nl/sitecore_jss_typescript/)