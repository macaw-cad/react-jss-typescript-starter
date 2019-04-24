// This file is generated. Regenerate using: node scripts/generate-view-model.js --component MarkdownViewer
import { Field } from '@sitecore-jss/sitecore-jss';
export interface MarkdownViewerBaseProps {
  fields: MarkdownViewerFields;
}

export interface MarkdownViewerFields {
  body: Field; // CommonFieldTypes: Multi-Line Text
  url: Field; // CommonFieldTypes: Single-Line Text
}