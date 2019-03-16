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
                    <h6 data-panel="footer-cases" data-accordeon="o-footer__links">Cases</h6>
                    <div id="footer-cases" className="m-panel m-panel--inline is-closed">
                        <ul className="a-list">
                            <li>
                                <a href="#">Intranet Eneco</a>
                            </li>
                            <li>
                                <a href="#">Priva dingen</a>
                            </li>
                            <li>
                                <a href="#">Enzo enzo</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="o-footer__links-group">
                    <h6 data-panel="footer-seo" data-accordeon="o-footer__links" className="">SEO Categorie</h6>
                    <div id="footer-seo" className="m-panel m-panel--inline is-closed">
                        <ul className="a-list">
                            <li>
                                <a href="#">Sitecore Commerce</a>
                            </li>
                            <li>
                                <a href="#">Xamarin</a>
                            </li>
                            <li>
                                <a href="#">Sharepoint adoptie</a>
                            </li>
                            <li>
                                <a href="#">Marketing automation</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="o-footer__links-group">
                    <h6 data-panel="footer-blogs" data-accordeon="o-footer__links">Blogs</h6>
                    <div id="footer-blogs" className="m-panel m-panel--inline is-closed">
                        <ul className="a-list">
                            <li>
                                <a href="#">Adoptie van Office 365</a>
                            </li>
                            <li>
                                <a href="#">Business Apps</a>
                            </li>
                            <li>
                                <a href="#">Online samenwerken met tools van IT</a>
                            </li>
                            <li>
                                <a href="#">Samenwerken op e-commerce gebied</a>
                            </li>
                            <li>
                                <a href="#">Schaduw IT</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="o-footer__links-group">
                    <h6 data-panel="footer-whitepapers" data-accordeon="o-footer__links">Whitepapers</h6>
                    <div id="footer-whitepapers" className="m-panel m-panel--inline is-closed">
                        <ul className="a-list">
                            <li>
                                <a href="#">Employee empowerment</a>
                            </li>
                            <li>
                                <a href="#">The Age of the Customer</a>
                            </li>
                            <li>
                                <a href="#">Office 365 of Google Apps</a>
                            </li>
                            <li>
                                <a href="#">Office 365 adoptie</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="o-footer__links-group">
                    <h6 data-panel="footer-work" data-accordeon="o-footer__links">Werken bij</h6>
                    <div id="footer-work" className="m-panel m-panel--inline is-closed">
                        <ul className="a-list">
                            <li>
                                <a href="#">Technisch CRM Consultant</a>
                            </li>
                            <li>
                                <a href="#">IT Traineeship Developer</a>
                            </li>
                            <li>
                                <a href="#">Data &amp; Analytics Solution Consultant</a>
                            </li>
                            <li>
                                <a href="#">Solution Architect</a>
                            </li>
                            <li>
                                <a href="#">BI Specialist</a>
                            </li>
                            <li>
                                <a href="#">Azure Cloud Engineer</a>
                            </li>
                            <li>
                                <a href="#"><strong>Nog 20 vacatures</strong></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};

export default FooterLinks;
