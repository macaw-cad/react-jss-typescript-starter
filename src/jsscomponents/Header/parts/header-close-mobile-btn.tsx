import * as React from 'react';

class HeaderCloseMenuButton extends React.Component<any, any> {
    render() {
        return (
            <React.Fragment>
                <a href="#" className="o-header__btn-close">
                    <svg className="a-icon" role="img">
                        <use xlinkHref="assets/img/icons/icons.svg#close" />
                    </svg>
                </a>
            </React.Fragment>
        )
    }
};

export default HeaderCloseMenuButton;
