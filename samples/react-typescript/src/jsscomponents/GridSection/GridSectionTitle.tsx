import * as React from 'react';
import Heading from '../../components/Heading';
import { HeadingLevel } from '../../components/HeadingLevel';

interface Props {
    title: string;
    headingLevel?: HeadingLevel;
    parameters?: {
        className?: string,
        backgroundColor?: string,
    };
}

const SectionTitle: React.StatelessComponent<Props> = ({ title, headingLevel, parameters }) => {

    return (
        <div className="m-section__title--container">
            <Heading level={headingLevel ? headingLevel : undefined} className="m-section__title--heading">
                {title}
            </Heading>
        </div>
    );
};

export default SectionTitle;
