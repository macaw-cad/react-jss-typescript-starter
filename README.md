# react-jss-typescript-starter

The [react-jss-typescript-starter](https://github.com/macaw-interactive/react-jss-typescript-starter) is a Node 
based frontend for a Sitecore 9.1 JSS app. It is based on the Sitecore provided sample [node-headless-ssr-proxy](https://github.com/Sitecore/jss/tree/dev/samples/node-headless-ssr-proxy) combined with the starter as scaffolded using `jss create react-jss-typescript-starter react`. The code
of the scaffolded site is (mostly) converted to TypeScript and a lot of additional features
are added.

Provided features:

- JSS standard (well documented) development flow, but with some enhancements
- JSS component scaffolding using Plop
- data/routes sample Yaml export from Sitecore using Plop
- Development workflow with separation JSS components (as container components)and presentational components (see [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0))
- Storybook for presentational components
- Build task extended to build Node Express based web server with headless server side rendering
- Dockerfile to build Docker image for running front-end web server


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


## Development scripts

The JSS React Starter Application is configured for TypeScript based development.
Provides a front-end node server.

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