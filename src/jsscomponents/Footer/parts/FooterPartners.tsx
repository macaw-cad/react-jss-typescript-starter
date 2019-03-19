import * as React from 'react';
import HeaderLogo from '../../Header/parts/header.logo';

interface Props {
};

interface State {
};

class FooterPartners extends React.Component<Props, State> {
    render() {
        return (
            <ul className="o-footer__partners a-list a-list--hor h-ph h-pb">
                <li>
                <a href="/"><HeaderLogo className="o-footer--logo" /></a>
                </li>
            </ul>
        )
    }
};

export default FooterPartners;
