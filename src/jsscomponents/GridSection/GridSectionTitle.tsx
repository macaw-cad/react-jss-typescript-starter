import * as React from "react";
import Heading from "../../components/Heading";

enum Headings {
    H1 = "H1",
    H2 = "H2",
    H3 = "H3",
    H4 = "H4",
    H5 = "H5",
}

interface Props {
    title: string;
    heading?: Headings;
    parameters?: {
        className?: string,
        backgroundColor?: string,
    };
}

const SectionTitle: React.StatelessComponent<Props> = ({ title, heading, parameters }) => {

    return (
        <div className="m-section__title--container">
            <Heading level={heading ? heading : undefined} className="m-section__title--heading">
                {title}
            </Heading>
        </div>
    );
};

export default SectionTitle;
