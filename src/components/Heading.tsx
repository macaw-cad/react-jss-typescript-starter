import * as React from 'react';
import { HeadingLevel } from './HeadingLevel';

interface HeadingProps {
    level?: HeadingLevel;
    children?: any;
    className?: string;
}

const Heading: React.SFC<HeadingProps> = ({ level, children, className }) => {
    const headingName = (level || 'span').toLowerCase();

    return (
      React.createElement(
        `${headingName}`,
        {className},
        children,
      )
    );
};

export default Heading;
