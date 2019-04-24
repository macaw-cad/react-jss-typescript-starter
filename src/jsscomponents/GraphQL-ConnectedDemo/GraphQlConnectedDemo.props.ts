// This file is generated. Regenerate using: node scripts/generate-view-model.js --component GraphQL-ConnectedDemo
import { Field } from '@sitecore-jss/sitecore-jss';
import { LinkField } from '@sitecore-jss/sitecore-jss-react/types/components/Link';
export interface GraphQlConnectedDemoBaseProps {
  fields: GraphQlConnectedDemoFields;
}

export interface GraphQlConnectedDemoFields {
  sample1: Field; // CommonFieldTypes: Single-Line Text
  sample2: LinkField; // CommonFieldTypes: General Link
}