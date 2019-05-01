// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-Section component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 */
export default function(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-Section',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'heading', type: CommonFieldTypes.SingleLineText }],
    placeholders: ['jss-styleguide-section'],
  });
}
