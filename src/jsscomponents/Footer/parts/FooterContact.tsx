import * as React from 'react';

interface Props {
};

interface State {
};

class FooterContact extends React.Component<Props, State> {
    render() {
        return (
            <ul className="o-footer__contact a-list a-list--hor">
                <li>
                    <a href="https://github.com/macaw-interactive/react-jss-typescript-starter">Our Github Repo</a>
                </li>
                <li>
                    <a href="mailto:gary.wenneker@macaw.nl">Contact</a>
                </li>
            </ul>
        )
    }
};

export default FooterContact;
