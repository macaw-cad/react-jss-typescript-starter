// eslint-disable-next-line no-unused-vars
import { Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adding placeholders is optional but allows setting a user-friendly display name. Placeholder Settings
 * items will be created for any placeholders explicitly added, or discovered in your routes and component definitions.
 * Invoked by convention (*.sitecore.js) when `jss manifest` is run.
 * @param {Manifest} manifest
 */
export default function addPlaceholdersToManifest(manifest) {
  manifest.addPlaceholder(
    { name: 'jss-main', displayName: 'Main' },
    { name: 'jss-grid-0', displayName: 'Column 1' },
    { name: 'jss-grid-1', displayName: 'Column 2' },
    { name: 'jss-grid-2', displayName: 'Column 3' },
    { name: 'jss-grid-3', displayName: 'Column 4' },
    { name: 'jss-grid-4', displayName: 'Column 5' },
    { name: 'jss-grid-5', displayName: 'Column 6' },
    { name: 'jss-grid-6', displayName: 'Column 7' },
    { name: 'jss-grid-7', displayName: 'Column 8' },
    { name: 'jss-grid-8', displayName: 'Column 9' },
    { name: 'jss-grid-9', displayName: 'Column 10' },
    { name: 'jss-grid-10', displayName: 'Column 11' },
    { name: 'jss-grid-11', displayName: 'Column 12' },
    { name: 'page-structure-header', displayName: 'header', id: 'page-structure-header' },
    { name: 'page-structure-content', displayName: 'content', id: 'page-structure-content' },
    { name: 'page-structure-main', displayName: 'main', id: 'page-structure-main' },
    // you can optionally pass a GUID or unique (app-wide) string as an ID
    // this will inform the ID that is set when imported into Sitecore.
    // If the ID is not set, an ID is created based on the placeholder name.
    { name: 'jss-tabs', displayName: 'Tabs', id: 'tabs-placeholder' },
    { name: 'hero-image', displayName: 'Hero Image' },
    { name: 'jss-grid-section', displayName: 'Grid Section' },
  );
}
