import * as React from 'react';

import { Headings } from '../types/macaw/Headings';

interface HeadingProps {
    level?: Headings;
    children?: any;
    className?: string;
}

const Heading: React.SFC<HeadingProps> = ({ level, children, className }) => {
    const headingName = (level || "span").toLowerCase();

    return (
      React.createElement(
       `${headingName}`,
        {className},
        children,
      )
    );
};

export default Heading;
