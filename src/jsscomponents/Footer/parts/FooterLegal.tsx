import * as React from 'react';

interface Props {
};

interface State {
};

class FooterLegal extends React.Component<Props, State> {
    render() {
        return (
            <ul className="o-footer__legal a-list a-list--hor h-pa">
                <li>
                    <a href="/terms">Terms and Conditions</a>
                </li>
                <li>
                    <a href="#">Privacy statement</a>
                </li>
            </ul>
        )
    }
};

export default FooterLegal;
