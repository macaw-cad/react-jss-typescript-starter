import * as React from 'react';

class HeaderOpenMobileBtn extends React.Component<any, any> {
    render() {
        return (
            <React.Fragment>
                <a href="#mobile-menu" className="o-header__btn-open">
                    <svg className="a-icon" role="img">
                        <use xlinkHref="assets/img/icons/icons.svg#hamburger" />
                    </svg>
                </a>
            </React.Fragment>
        )
    }
};

export default HeaderOpenMobileBtn;
