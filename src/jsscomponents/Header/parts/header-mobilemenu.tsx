import * as React from 'react';

class HeaderMobileMenu extends React.Component<any, any> {
    render() {
        return (
            <React.Fragment>
                <nav id="mobile-menu" className="o-header__mobile">
                    <ul>
                        <li className="is-selected">
                            <a href="#">Inspiratie</a>
                            <ul>
                                <li><a href="cases.html">Cases</a></li>
                                <li className="is-selected"><a href="blogs.html">Blogs</a></li>
                                <li><a href="whitepapers.html">Whitepapers</a></li>
                                <li><a href="evenementen.html">Evenementen</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Expertise</a>
                            <ul>
                                <li><a href="bgvideo.html">Background Video</a></li>
                                <li><a href="herointro.html">hero intro</a></li>
                                <li><a href="whitepapers.hml">Whitepapers</a></li>
                                <li><a href="evenementen.hml">Evenementen</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Werken bij Macaw</a>
                            <ul>
                                <li><a href="/vacatures.html">Vacatures</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Over</a>
                        </li>
                        <li className="o-header__search">
                            <a href="#">Search</a>
                        </li>
                        <li className="o-header__lang">
                            <a href="" title="Switch to English">EN</a>
                        </li>

                    </ul>
                </nav>
            </React.Fragment>
        )
    }
};

export default HeaderMobileMenu;
