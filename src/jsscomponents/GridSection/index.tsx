import * as React from 'react';
import SectionTitle from './GridSectionTitle';
import { Placeholder, withPlaceholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

const GridSectionComponent: React.StatelessComponent<any> = (props) => {
    return (
        <section className={`m-section`}>
                { props && props.fields['title'] && props.fields.title.value ? 
                    <SectionTitle title={props.fields.title.value} heading={props.fields.heading.value} /> : null
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
   