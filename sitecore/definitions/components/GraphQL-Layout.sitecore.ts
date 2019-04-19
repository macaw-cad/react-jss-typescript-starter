import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the GraphQL-Layout component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest): void {
  manifest.addComponent({
    name: 'GraphQL-Layout',
    icon: SitecoreIcon.Layout,
    placeholders: ['jss-graphql-layout'],
  });
}
