import * as React from 'react';
import { withSitecoreContext, withPlaceholder } from '@sitecore-jss/sitecore-jss-react';
import { PlaceholderProps } from '@sitecore-jss/sitecore-jss-react/types/components/PlaceholderCommon';

type PageStructureProps = {
  header: PlaceholderProps;
  content: PlaceholderProps;
  footer: PlaceholderProps;
};

const PageStructure: React.SFC<PageStructureProps> = (props: PageStructureProps) => (
  <div className="site-wrapper" id="wrapper">
    <script src="https://unpkg.com/css-vars-ponyfill@1"></script>
    <script>
      cssVars();
  </script>
    <header id="header" className="o-header h-scroll-calc-top-offset__M">
      { props.header }
    </header>
    <main id="content" className="o-main">
    { props.content }
    </main>
    <footer id="footer" className="o-footer">
    { props.footer }
    </footer>
  </div>
);

const withPlaceholderInjected = withPlaceholder([
  {
    placeholder: 'page-structure-header',
    prop: 'head',
  },
  {
    placeholder: 'page-structure-content',
    prop: 'content',
  },
  {
    placeholder: 'page-structure-footer',
    prop: 'footer',
  }
])(PageStructure);

const withPlaceholderAndSitecoreContext = withSitecoreContext()(
  withPlaceholderInjected
);

export default withPlaceholderAndSitecoreContext;
