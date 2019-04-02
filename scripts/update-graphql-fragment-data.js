/* eslint-disable no-console, no-underscore-dangle */

import fetch from 'isomorphic-fetch';
import fs from 'fs';

// Apollo Client supports caching GraphQL responses, which can greatly reduce network traffic needs.
// In order to work correctly with interfaces in GraphQL, it needs to know some basic information about
// the shape of the GraphQL schema. This script pulls that necessary information from the GraphQL endpoint.
// See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
//
// The `jss graphql:update` command should be executed when Sitecore templates related to the site are altered.

const graphqlEndpoint =  `/api/${process.env.REACT_APP_SITECORE_JSS_APP_NAME}?sc_apikey=${process.env.REACT_APP_SITECORE_API_KEY}`;
console.log(`Updating GraphQL fragment type data from ${graphqlEndpoint}...`);
fetch(graphqlEndpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter((type) => type.possibleTypes !== null);

    const filteredResult = { ...result };
    filteredResult.data.__schema.types = filteredData;

    fs.writeFile(
      './src/temp/GraphQLFragmentTypes.json',
      JSON.stringify(filteredResult.data, null, 2),
      (err) => {
        if (err) {
          console.error('Error writing GraphQLFragmentTypes file', err);
          return;
        }

        console.log('GraphQL Fragment types successfully extracted!');
      }
    );
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
