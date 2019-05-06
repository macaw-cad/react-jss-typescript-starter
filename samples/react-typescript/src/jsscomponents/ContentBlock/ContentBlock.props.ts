// This file is generated. Regenerate using: node scripts/generate-view-model.js --component ContentBlock
import { Field } from '@sitecore-jss/sitecore-jss';
export interface ContentBlockBaseProps {
  fields: ContentBlockFields;
}

export interface ContentBlockFields {
  heading: Field; // CommonFieldTypes: Single-Line Text
  content: Field; // CommonFieldTypes: Rich Text
}