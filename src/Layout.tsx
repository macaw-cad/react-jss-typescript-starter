import * as React from 'react';
import { Placeholder, VisitorIdentification } from '@sitecore-jss/sitecore-jss-react';
import { NavLink } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import Helmet from 'react-helmet';

import './rootvars.css';
// Using bootstrap is completely optional. It's used here to provide a clean layout for samples,
// without needing extra CSS in the sample app. Remove it in package.json as well if it's removed here.
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/app.css';
import logo from './assets/images/sitecore.svg';
import Header from './jsscomponents/Header';
import Hero from './jsscomponents/Hero';
import Footer from './jsscomponents/Footer';
import Logger from './components/helpers/Logger';

/*
  APP LAYOUT
  This is where the app's HTML structure and root placeholders should be defined.

  All routes share this root layout by default (this could be customized in RouteHandler),
  but components added to inner placeholders are route-specific.
*/

// This is boilerplate navigation for sample purposes. Most apps should throw this away and use their own navigation implementation.
// Most apps may also wish to use GraphQL for their navigation construction; this sample does not simply to support disconnected mode.
let Navigation = ({ t, i18n }) => (
  <div className="header-area sticky d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
    <h5 className="my-0 mr-md-auto font-weight-normal">
      <NavLink to="/" className="text-dark">
        <img src={logo} alt="Sitecore" />
      </NavLink>
    </h5>
    <nav className="my-2 my-md-0 mr-md-3">
      <a
        className="p-2 text-dark"
        href="https://jss.sitecore.net"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('Documentation')}
      </a>
      <NavLink to="/styleguide" className="p-2 text-dark">
        {t('Styleguide')}
      </NavLink>
      <NavLink to="/graphql" className="p-2 text-dark">
        {t('GraphQL')}
      </NavLink>
    </nav>
    <section>test section</section>
  </div>
);

// inject dictionary props (`t`) into navigation so we can translate it
// NOTE: using this is needed instead of using i18next directly to keep
// the component state updated when i18n state (e.g. current language) changes
// SvdO, TODO: compilation issue
// @ts-ignore
Navigation = withNamespaces()(Navigation);

const ref = React.createRef();

class Layout extends React.Component<any, any> {
  componentDidMount() {
  }
  render() {
    return (
      <React.Fragment>
        {/* react-helmet enables setting <head> contents, like title and OG meta tags */}
        <Helmet>
          <title>
            {(this.props.route.fields && this.props.route.fields.pageTitle && this.props.route.fields.pageTitle.value) || 'Page'}
          </title>
        </Helmet>

        {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.
  
        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
        <VisitorIdentification />

        {/* 
      // @ts-ignore */}
        <Header ref={ref} />
        <Hero {...this.props} refs={ref} />

        {/* root placeholder for the app, which we add components to using route data */}
        <div className="container">
          <Placeholder name="jss-main" rendering={this.props.route} />
        </div>

        <Footer />

      </React.Fragment>
    )
  }
}



export default Layout;
