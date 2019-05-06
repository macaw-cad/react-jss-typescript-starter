// This file is generated. Regenerate using: node scripts/generate-view-model.js --component Styleguide-FieldUsage-Link
import { Field } from '@sitecore-jss/sitecore-jss';
import { LinkField } from '@sitecore-jss/sitecore-jss-react/types/components/Link';
export interface StyleguideFieldUsageLinkBaseProps {
  fields: StyleguideFieldUsageLinkFields;
}

export interface StyleguideFieldUsageLinkFields {
  externalLink: LinkField; // CommonFieldTypes: General Link
  internalLink: LinkField; // CommonFieldTypes: General Link
  emailLink: LinkField; // CommonFieldTypes: General Link
  paramsLink: LinkField; // CommonFieldTypes: General Link
}