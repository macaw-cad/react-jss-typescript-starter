// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the GridBuilder component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: 'GridBuilder',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'columns', type: CommonFieldTypes.SingleLineText },
      { name: 'placeholders', type: CommonFieldTypes.SingleLineText },
    ],
    placeholders: [
      'jss-grid-0',
      'jss-grid-1',
      'jss-grid-2',
      'jss-grid-3',
      'jss-grid-4',
      'jss-grid-5',
      'jss-grid-6',
      'jss-grid-7',
      'jss-grid-8',
      'jss-grid-9',
      'jss-grid-10',
      'jss-grid-11',
      'page-structure-header',
      'page-structure-body',
      'page-structure-footer'
    ]
  });
}
