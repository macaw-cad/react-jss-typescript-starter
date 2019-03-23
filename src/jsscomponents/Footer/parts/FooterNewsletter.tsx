import * as React from 'react';

interface Props {
};

interface State {
};

class FooterNewsletter extends React.Component<Props, State> {
    render() {
        return (
            <div className="o-footer__newsletter">
                <h6>Check our Umbrella for Sitecore JSS</h6>
                <p><a href="https://github.com/macaw-interactive/umbrella-for-sitecore-jss">click here</a></p>
            </div>
        )
    }
};

export default FooterNewsletter;
