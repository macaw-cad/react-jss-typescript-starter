import * as React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import { ContentBlockBaseProps } from './ContentBlock.props';

type ContentBlockProps = ContentBlockBaseProps;

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const ContentBlock: React.FunctionComponent<ContentBlockProps> = ({ fields }) => (
  <React.Fragment>
    <Text tag="h2" className="display-4" field={fields.heading as any} />

    <RichText className="contentDescription" field={fields.content as any} />
  </React.Fragment>
);

export default ContentBlock;
