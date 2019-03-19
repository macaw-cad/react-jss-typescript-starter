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
                    <a href="tel:+31 23 2060 600">+31 23 2060 600</a>
                </li>
                <li>
                    <a href="mailto:info@macaw.nl">info@macaw.nl</a>
                </li>
            </ul>
        )
    }
};

export default FooterContact;
