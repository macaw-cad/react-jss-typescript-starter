import * as React from 'react';

interface Props {
};

interface State {
};

class FooterPayoff extends React.Component<Props, State> {
    render() {
        return (
            <div className="o-footer__payoff h-pt-d">
                <svg width="90" height="15" role="img">
                    <use xlinkHref="/icons/icons.svg#macaw" />
                </svg>
                <p className="o-footer__payofftext"><span>Challenge</span> <span>accepted.</span></p>
            </div>
        )
    }
};

export default FooterPayoff;
