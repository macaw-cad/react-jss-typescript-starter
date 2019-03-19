import * as React from 'react';

interface Props {
};

interface State {
};

class FooterAddress extends React.Component<Props, State> {
    render() {
        return (
            <div className="o-footer__address">
                <address>
                    <strong>Amsterdam</strong><br />
                    Taurusavenue 16E<br />
                    2132 LS  Hoofddorp<br />
                </address>
                <a href="#">Contact &amp; route</a>
            </div>
        )
    }
};

export default FooterAddress;
