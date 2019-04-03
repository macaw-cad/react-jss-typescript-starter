import * as React from 'react';

enum Headings {
  H1 = "H1",
  H2 = "H2",
  H3 = "H3",
  H4 = "H4",
  H5 = "H5",
}

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
