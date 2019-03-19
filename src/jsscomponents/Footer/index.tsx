import * as React from 'react';
import Logger from '../../components/helpers/Logger';
import FooterPayoff from './parts/FooterPayoff';
import FooterContact from './parts/FooterContact';
import FooterLinks from './parts/FooterLinks';
import FooterNewsletter from './parts/FooterNewsletter';
import FooterSocial from './parts/FooterSocial';
import FooterAddress from './parts/FooterAddress';
import FooterLegal from './parts/FooterLegal';
import FooterPartners from './parts/FooterPartners';

interface Props {
};

interface State {
};

class Footer extends React.Component<Props, State> {
  render() {
    return (
      <footer className="o-footer">
        <section className="m-section">
          <div className="m-grid">
            <div className="m-grid__S7">
              <FooterPayoff />
            </div>
            <div className="m-grid__S5">
              <FooterContact />
            </div>
          </div>
          <div className="m-grid o-footer__nav">
            <div className="m-grid__M9">
              <FooterLinks />
            </div>
            <div className="m-grid__12">
              <FooterNewsletter />
            </div>
            <div className="m-grid__M3">
              <FooterSocial />
              <FooterAddress />
            </div>
          </div>
          <div className="m-grid m-grid--wide">
            <div className="m-grid__M6">
              <FooterLegal />
            </div>
            <div className="m-grid__M6">
              <FooterPartners />
            </div>
          </div>
        </section>
      </footer>
    )
  }
};

export default Footer;
