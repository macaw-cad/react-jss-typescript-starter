import { readFileSync } from 'fs';
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

const query = readFileSync(
  'sitecore/definitions/components/GraphQL-IntegratedDemo.sitecore.graphql',
  'utf8'
);

/**
 * Adds the GraphQL-IntegratedDemo component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest): void {
  manifest.addComponent({
    name: 'GraphQL-IntegratedDemo',
    icon: SitecoreIcon.GraphConnection_directed,
    graphQLQuery: query,
    fields: [
      { name: 'sample1', type: CommonFieldTypes.SingleLineText },
      { name: 'sample2', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
