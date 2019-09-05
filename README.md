# Status
| Branch | Build status | Disconnected example url |
| --- | --- | --- |
| develop | [![Build Status](https://dev.azure.com/MacawInteractive/react-jss-typescript-starter/_apis/build/status/react-jss-typescript-starter?branchName=develop)](https://dev.azure.com/MacawInteractive/react-jss-typescript-starter/_build/latest?definitionId=1&branchName=develop) | https://react-jss-typescript-starter-develop.azurewebsites.net (latest)|
| master | [![Build Status](https://dev.azure.com/MacawInteractive/react-jss-typescript-starter/_apis/build/status/react-jss-typescript-starter?branchName=master)](https://dev.azure.com/MacawInteractive/react-jss-typescript-starter/_build/latest?definitionId=1&branchName=master) | https://react-jss-typescript-starter.azurewebsites.net (behind on develop)|

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

# Enable GraphQL Typescript generation.
To generate the graphql typescript types and queries from your schema, configure the codegen.yml and run:
```
npm run typescript:generate
```
You will have an generated file at this location: src\models\Types.ts
More info [here](https://graphql-code-generator.com)