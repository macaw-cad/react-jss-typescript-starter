// This file is generated. Regenerate using: node scripts/generate-view-model.js --component GraphQL-IntegratedDemo
import { Field } from '@sitecore-jss/sitecore-jss';
import { LinkField } from '@sitecore-jss/sitecore-jss-react/types/components/Link';
export interface GraphQlIntegratedDemoBaseProps {
  fields: GraphQlIntegratedDemoFields;
}

export interface GraphQlIntegratedDemoFields {
  sample1: Field; // CommonFieldTypes: Single-Line Text
  sample2: LinkField; // CommonFieldTypes: General Link
}