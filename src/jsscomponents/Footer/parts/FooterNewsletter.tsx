import * as React from 'react';

interface Props {
};

interface State {
};

class FooterNewsletter extends React.Component<Props, State> {
    render() {
        return (
            <div className="o-footer__newsletter">
                <h6>Aanmelden nieuwsbrief</h6>
                <p>blijf op de hoogte van alle business</p>
                <div className="m-wffm-forms">
                </div>
            </div>
        )
    }
};

export default FooterNewsletter;
