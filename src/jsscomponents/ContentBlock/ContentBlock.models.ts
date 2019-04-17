
import { ContentFieldValue } from '@sitecore-jss/sitecore-jss-manifest'

export interface ContentBlockProps {
  fields: ContentBlockFields
}

export interface ContentBlockFields {
  heading: ContentFieldValue; // CommonFieldTypes: Single-Line Text
  content: string; // CommonFieldTypes: Rich Text
}

