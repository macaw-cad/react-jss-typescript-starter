import * as React from 'react';

interface BackgroundImage {
    cssStyles: React.CSSProperties;
    className: string;
}

const BackgroundPicture: React.SFC<BackgroundImage> = (props) => {
    const { className, cssStyles, children } = props;
    return (
        <div className={className} style={cssStyles}>
            {children}
        </div>
    );
};

export default BackgroundPicture;
