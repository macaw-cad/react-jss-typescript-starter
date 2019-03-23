import * as React from 'react';

interface Props {
};

interface State {
};

class FooterLinks extends React.Component<Props, State> {
    render() {
        return (
            <div className="o-footer__links h-mb-d">
                <div className="o-footer__links-group">
                    <h6 data-panel="footer-cases" data-accordeon="o-footer__links">Features</h6>
                    <div id="footer-cases" className="m-panel m-panel--inline is-closed">
                        <ul className="a-list">
                            <li>
                                <a href="https://jss.sitecore.com/features/why-jss">Why JSS</a>
                            </li>
                            <li>
                                <a href="https://jss.sitecore.com/features/why-sitecore">Why Sitecore</a>
                            </li>
                            <li>
                                <a href="https://github.com/macaw-interactive/umbrella-for-sitecore-jss">Umbrella</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="o-footer__links-group">
                    <h6 data-panel="footer-seo" data-accordeon="o-footer__links" className="">Documentation</h6>
                    <div id="footer-seo" className="m-panel m-panel--inline is-closed">
                        <ul className="a-list">
                            <li>
                                <a href="https://jss.sitecore.com/docs/getting-started/quick-start">Getting started</a>
                            </li>
                            <li>
                                <a href="https://jss.sitecore.com/docs/fundamentals/architecture">Fundamentals</a>
                            </li>
                            <li>
                                <a href="https://jss.sitecore.com/docs/client-frameworks/react/react-overview">Client Frameworks</a>
                            </li>
                            <li>
                                <a href="https://jss.sitecore.com/docs/techniques/mvc-integration/javascript-rendering">Techniques</a>
                            </li>
                            <li>
                                <a href="https://jss.sitecore.com/release-notes">Release Notes</a>
                            </li>
                            <li>
                                <a href="https://jss.sitecore.com/help">Faqs</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="o-footer__links-group">
                    <h6 data-panel="footer-seo" data-accordeon="o-footer__links" className="">Umbrella</h6>
                    <div id="footer-seo" className="m-panel m-panel--inline is-closed">
                        <ul className="a-list">
                            <li>
                                <a href="https://github.com/macaw-interactive/umbrella-for-sitecore-jss">Umbrella API</a>
                            </li>
                            <li>
                                <a href="https://github.com/macaw-interactive/react-jss-typescript-starter">React JSS TypeScript starter</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};

export default FooterLinks;
