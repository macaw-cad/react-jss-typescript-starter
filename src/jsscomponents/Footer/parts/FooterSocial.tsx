import * as React from 'react';

interface Props {
};

interface State {
};

class FooterSocial extends React.Component<Props, State> {
    render() {
        return (
            <ul className="o-footer__social a-list">
                <li>
                    <a href="#">
                        <svg className="a-icon" role="img">
                            <use xlinkHref="/icons/icons.svg#linkedin" />
                        </svg>
                        <span>Linkedin</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <svg className="a-icon" role="img">
                            <use xlinkHref="/icons/icons.svg#facebook" />
                        </svg>
                        <span>FaceBook</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <svg className="a-icon" role="img">
                            <use xlinkHref="/icons/icons.svg#twitter" />
                        </svg>
                        <span>Twitter</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <svg className="a-icon" role="img">
                            <use xlinkHref="/icons/icons.svg#instagram" />
                        </svg>
                        <span>Instagram</span>
                    </a>
                </li>
            </ul>
        )
    }
};

export default FooterSocial;
