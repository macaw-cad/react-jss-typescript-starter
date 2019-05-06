
  import { ContentFieldValue } from '@sitecore-jss/sitecore-jss-manifest'

  export interface MarkdownViewerProps {
    fields: MarkdownViewerFields
  }

  export interface MarkdownViewerFields {
    body: ContentFieldValue; // CommonFieldTypes: Multi-Line Text
  url: ContentFieldValue; // CommonFieldTypes: Single-Line Text
  }

  