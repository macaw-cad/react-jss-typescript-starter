import * as React from 'react';
import SectionTitle from './GridSectionTitle';
import { getFieldValue, withPlaceholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

const GridSectionComponent: React.StatelessComponent<any> = (props) => {
    const title = getFieldValue(props.fields, 'title');
    const headingLevel = getFieldValue(props.fields, 'headingLevel');
    return (
        <section className={`m-section`}>
                { title && 
                    <SectionTitle title={title} headingLevel={headingLevel} />
                }
                {props.sectionPlaceholder}
            </section>
    );
};

const sectionComponentWithPlaceholderInjected = withPlaceholder({
    placeholder: 'jss-grid-section',
    prop: 'sectionPlaceholder',
  })(GridSectionComponent);
  
  // We need to know if experience editor is active, to disable the dynamic tab behavior for editing.
  // Using the same technique as injecting the placeholder, we wrap the component again to inject the
  // `sitecoreContext` prop.
const GridSection = withSitecoreContext()(
    sectionComponentWithPlaceholderInjected
  );
  
export default GridSection;
   