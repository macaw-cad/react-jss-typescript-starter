import * as React from 'react';

class HeaderDesktopMenu extends React.Component<any, any> {
    render() {
        return (
            <React.Fragment>
                <nav className="o-header__menu">
                    <ul className="a-list a-list--hor">
                        <li>
                            <a href="/styleguide" data-panel="nav-expertise">Styleguide</a>
                            <div id="nav-expertise" className="o-header__submenu m-panel is-closed">
                                <ul className="a-list a-list--hor">
                                    <li><a href="bgvideo.html">Background Video</a></li>
                                    <li><a href="herointro.html">hero intro</a></li>
                                    <li><a href="whitepapers.html">Whitepapers</a></li>
                                    <li><a href="events.html">Events</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="/graphql" data-panel="nav-werkenbij">GraphQL</a>
                            <div id="nav-werkenbij" className="o-header__submenu m-panel is-closed">
                                <ul className="a-list a-list--hor">
                                    <li><a href="/vacatures.html">Vacatures</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        {/*<li className="o-header__lang">
                            <span>NL</span>
                            <a href="" title="Switch to English">EN</a>
                        </li>*/}
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
};

export default HeaderDesktopMenu;
