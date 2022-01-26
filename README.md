# Status
| Branch | Build status | Disconnected example url |
| --- | --- | --- |
| develop | [![Build Status](https://dev.azure.com/MacawInteractive/react-jss-typescript-starter/_apis/build/status/react-jss-typescript-starter?branchName=develop)](https://dev.azure.com/MacawInteractive/react-jss-typescript-starter/_build/latest?definitionId=1&branchName=develop) | https://react-jss-typescript-starter-develop.azurewebsites.net (latest)|
| master | [![Build Status](https://dev.azure.com/MacawInteractive/react-jss-typescript-starter/_apis/build/status/react-jss-typescript-starter?branchName=master)](https://dev.azure.com/MacawInteractive/react-jss-typescript-starter/_build/latest?definitionId=1&branchName=master) | https://react-jss-typescript-starter.azurewebsites.net (behind on develop)|

# Depricated Notice
This React JSS starter for Sitecore is a few years old. A lot has happened in the mean time:
- The license for JSS is now included in the Sitecore 10.x license (this is great! No reason NOT to build a headless site on Sitecore!)
- The Next.js framework has become very popular, and Sitecore provides a JSS JavaScript Rendering SDK for Next.js (see [here](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-next-js.html)). This means:
  - Deployment possible to CDN - page caching
  - Static site generation + Incremental Static Generation (ISG)
  - Run on serverless infrastructure (Vercel, Azure - with our new headstart!)
- Sitecore provides Experience Edge as content delivery server - CDN with JSS and GraphQL endpoint, and hosting of assets (images)
- Sitecore will provide XM Cloud - a SaaS version of Sitecore XM - in the future

We still prefer the usage of a PaaS version of Sitecore XM, in combination with Next.Js headless JSS - with everything hosted on Azure. That is why we created a new headstart solution [nextjs-on-azure](https://github.com/macaw-cad/nextjs-on-azure): 

> _Run Next.js on Azure Functions with the Microsoft CDN - with examples for Sitecore Headless Services (JSS), consumption of GraphQL. Comes with a headstart for building React components & styling._

This headstart enables hosting of the complete Sitecore solution on Azure, instead of hosting on multiple cloud solutions, in this case Sitecore Cloud + the Vercel cloud (and probably Azure cloud for other parts of the solution).

So checkout [nextjs-on-azure](https://github.com/macaw-cad/nextjs-on-azure) and let us know if it works for you!

# Quick Start

Welcome to the **react-jss-typescript-starter** template, the ultimate template to start your Sitecore JSS project with React + TypeScript and deploy it in a Docker container.

If you have [Node](https://nodejs.org) installed you can get started in four commands, even without having Sitecore running on your machine:

```
npm install -g @sitecore-jss/sitecore-jss-cli
jss create --repository macaw-interactive/react-jss-typescript-starter --branch develop my-first-jss-app react-typescript
cd my-first-jss-app
jss start
```

# And start reading...

- [The official JSS Quick Start](https://jss.sitecore.com/docs/getting-started/quick-start)
- [The react-jss-typescript-starter documentation - part of Umbrella for Sitecore JSS](samples/react-typescript/README.md)
