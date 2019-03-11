import * as React from 'react';
import { BreakPoints } from '../../types/macaw/BreakPoints';
import { Headings } from '../../types/macaw/Headings';
import Image from '../../types/Image';
import CustomStyle from "../../containers/CustomStyle";
import { Placeholder } from "../../containers/Placeholder";
import SectionTitle from './GridSectionTitle';

export interface SectionProps {
    parameters?: {
        className?: string,
        backgroundImage?: Image,
        backgroundColor?: string,
        title?: string,
        heading?: Headings,
    };
    placeholders?: any;
    children?: any;
}

const GridSection: React.SFC<SectionProps> = ({ parameters, placeholders, children }) => {
    let css = ``;

    console.log(parameters && parameters.backgroundColor)

    if (parameters && parameters.backgroundImage && parameters.className) {
        css = `
            .${parameters.className} {
                background-image: url(${parameters.backgroundImage.default});
                background-repeat: no-repeat;
                background-size: contain;
            }

            ${(parameters.backgroundImage.sizes && parameters.backgroundImage.sizes.s) ?
                `@media only screen and (min-width: ${BreakPoints.S}) {
                    .${parameters.className} {
                        background-image: url(${parameters.backgroundImage.sizes.s});
                    }
                }`
                : ``
            }

            ${(parameters.backgroundImage.sizes && parameters.backgroundImage.sizes.m) ?
                `@media only screen and (min-width: ${BreakPoints.M}) {
                    .${parameters.className} {
                        background-image: url(${parameters.backgroundImage.sizes.m});
                    }
                }`
                : ``
            }

            ${(parameters.backgroundImage.sizes && parameters.backgroundImage.sizes.l) ?
                `@media only screen and (min-width: ${BreakPoints.L}) {
                    .${parameters.className} {
                        background-image: url(${parameters.backgroundImage.sizes.l});
                    }
                }`
                : ``
            }

            ${(parameters.backgroundImage.sizes && parameters.backgroundImage.sizes.xl) ?
                `@media only screen and (min-width: ${BreakPoints.XL}) {
                    .${parameters.className} {
                        background-image: url(${parameters.backgroundImage.sizes.xl});
                    }
                }`
                : ``
            }
        `;
    }

    return (
        <CustomStyle backgroundColor={parameters && parameters.backgroundColor}>
            {css &&
                <style>
                    {css}
                </style>
            }
            <section className={`m-section ${(parameters && parameters.className) ? parameters.className : ''}`}>
                { parameters && parameters.title &&
                    <SectionTitle title={parameters.title} heading={parameters.heading} {...parameters} />
                }
                <Placeholder children={children} placeholders={placeholders} />
            </section>
        </CustomStyle>
    );
};

export default GridSection;
