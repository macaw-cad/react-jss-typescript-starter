// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the GridColumns component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 */
export default function(manifest: Manifest): void {
  manifest.addComponent({
    name: 'GridColumns',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'columns', type: CommonFieldTypes.SingleLineText },
    ],
    placeholders: [
      'jss-grid-column-0',
      'jss-grid-column-1',
      'jss-grid-column-2',
      'jss-grid-column-3',
      'jss-grid-column-4',
      'jss-grid-column-5',
      'jss-grid-column-6',
      'jss-grid-column-7',
      'jss-grid-column-8',
      'jss-grid-column-9',
      'jss-grid-column-10',
      'jss-grid-column-11',
      'jss-grid-column-12',
      'page-structure-header',
      'page-structure-body',
      'page-structure-footer'
    ]
  });
}
