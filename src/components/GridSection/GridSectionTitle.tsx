import * as React from "react";
import { CustomStyleParametersProps } from "../../types/CustomStyle";
import { Headings } from '../../types/macaw/Headings';
import CustomStyle from '../../containers/CustomStyle';
import Heading from '../../containers/Heading';

interface Props {
    title: string;
    heading?: Headings;
    parameters?: {
        className?: string,
        backgroundColor?: string,
    };
}

const SectionTitle: React.SFC<Props> = ({title, heading, parameters}) => {
    let newParameters = {...parameters} as CustomStyleParametersProps;

    if (!newParameters) {
        newParameters = {
            className: "m-section__title",
        };
    } else if (newParameters.className === undefined) {
        newParameters.className = "m-section__title";
    } else if (newParameters && (newParameters.className !== undefined)) {
        newParameters.className = newParameters.className.concat(" m-section__title");
    }

    return (
        <CustomStyle {...newParameters}>
            <div className="m-section__title--container">
                <Heading level={heading ? heading : undefined } className="m-section__title--heading">
                    {title}
                </Heading>
            </div>
        </CustomStyle>
    );
};

export default SectionTitle;
