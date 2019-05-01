// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Hero component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Hero',
    // totally optional, but fun
    icon: SitecoreIcon.UmbrellaOpen,
    fields: [
      { name: 'image', type: CommonFieldTypes.Image },
    ]
  });
}
