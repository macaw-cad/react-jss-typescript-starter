import * as React from 'react';

import HeaderCloseMenuButton from './parts/header-close-mobile-btn';
import HeaderDesktopMenu from './parts/header-desktopmenu';
import HeaderOpenMobileBtn from './parts/header-open-mobile-btn';
import HeaderMobileMenu from './parts/header-mobilemenu';
import HeaderLogo from './parts/header.logo';
import Logger from '../../components/helpers/Logger';

class Header extends React.Component<any, any> {

    render() {
        return (
            <React.Fragment>
                <header id="header" className="o-header o-header--transparent">
                    <section className="m-section">
                        <div className="m-grid m-grid--wide">
                            <div className="m-grid__8 m-grid__M3">
                                <a href="/"><HeaderLogo /></a>
                                <HeaderMobileMenu />
                            </div>
                            <div className="m-grid__4 m-grid__M9">
                                <HeaderOpenMobileBtn />
                                <HeaderDesktopMenu />
                            </div>
                        </div>
                    </section>
                </header>

                <HeaderCloseMenuButton />
            </React.Fragment>
        )
    }
};

export default Header;
