import * as React from "react";

import {
    CustomBackgroundColors,
    CustomHorizontalAlignOptions,
    CustomSpacingsProps,
    CustomStyleParametersProps,
    CustomVerticalAlignOptions,
} from "../types/CustomStyle";
import { joinClasses } from "../utils/Filters";


interface CustomStyleProps extends CustomStyleParametersProps {
    createSpacingClassName?: any;
    generateSpacingClassesFromCustomParameters?: any;
}
class CustomStyle extends React.Component<CustomStyleProps, any> {

    createSpacingClassName: (prop: string, spacing?: CustomSpacingsProps) => string | undefined;
    generateSpacingClassesFromCustomParameters: (
        verticalSpacingTop: string,
        verticalSpacingBottom: string, 
        verticalSpacing: string, 
        negativeMargin: string) => string | undefined;

    constructor(props) {
        super(props);

        this.createSpacingClassName = (prop: string, spacing?: CustomSpacingsProps): string | undefined => {
            if (!spacing) {
                return undefined;
            }

            if (typeof spacing === "number") {
                return `h-spacing-${prop}__${spacing}`;
            }

            return Object.keys(spacing).reduce((value, bp) => {
                return Object.keys(spacing[bp]).reduce((v, pos) => {
                    return joinClasses(v, `h-spacing-${prop}${pos}__${bp}${spacing[bp][pos]}`);
                }, value); // possibles outputs per variable: "h-spacing-[m|p][l|r|t|b|x|y]__[XL|L|M|S|''][size]"
            }, "");
        };

        this.generateSpacingClassesFromCustomParameters = (verticalSpacingTop,
            verticalSpacingBottom, verticalSpacing, negativeMargin) => {

            let localSpacingClassNames = "";

            if (negativeMargin !== "") {

                const negativeMarginClass = this.createSpacingClassName("m", {
                    "": { t: -negativeMargin }
                });

                localSpacingClassNames = joinClasses(localSpacingClassNames,
                    negativeMarginClass ? negativeMarginClass : '');

            } else if (verticalSpacing !== "") {

                const verticalSpacingAsNumber = parseInt(verticalSpacing, 10);

                const verticalSpacingClass = this.createSpacingClassName("m", {
                    "": { y: verticalSpacingAsNumber - 1 },
                    "M": { y: verticalSpacingAsNumber },
                });

                localSpacingClassNames = joinClasses(
                    localSpacingClassNames,
                    verticalSpacingClass ? verticalSpacingClass : '');

            } else if (verticalSpacingTop !== "") {

                const verticalSpacingTopAsNumber = parseInt(verticalSpacingTop, 10);

                const verticalSpacingTopClass = this.createSpacingClassName("m", {
                    "": { t: verticalSpacingTopAsNumber - 1 },
                    "M": { t: verticalSpacingTopAsNumber },
                });

                localSpacingClassNames = joinClasses(localSpacingClassNames,
                    verticalSpacingTopClass ? verticalSpacingTopClass : '');

            } else if (verticalSpacingBottom !== "") {

                const verticalSpacingBottomAsNumber = parseInt(verticalSpacingBottom, 10);

                const verticalSpacingBottomClass = this.createSpacingClassName("m", {
                    "": { b: verticalSpacingBottomAsNumber - 1 },
                    "M": { b: verticalSpacingBottomAsNumber },
                });

                localSpacingClassNames = joinClasses(localSpacingClassNames,
                    verticalSpacingBottomClass ? verticalSpacingBottomClass : '');
            }

            return localSpacingClassNames;
        };
    }

    render() {
        const {
            verticalSpacingTop = "",
            verticalSpacingBottom = "",
            verticalSpacing = "",
            negativeMargin = "",
        } = this.props;

        const spacingClassNames = this.generateSpacingClassesFromCustomParameters(verticalSpacingTop,
            verticalSpacingBottom, verticalSpacing, negativeMargin);

        const backgroundColorClass = this.props.backgroundColor
            ? this.props.backgroundColor in CustomBackgroundColors
                ? "h-background-color--" + CustomBackgroundColors[this.props.backgroundColor]
                : "h-background-color--default"
            : "";

        const contrastColorClass = this.props.contrastColor === "1" ? "h-contrast" : "";

        const horizontalAlignClass = this.props.horizontalAlign
            ? this.props.horizontalAlign in CustomHorizontalAlignOptions
                ? "h-flex-h-align-" + CustomHorizontalAlignOptions[this.props.horizontalAlign]
                : ""
            : "";

        const verticalAlignClass = this.props.verticalAlign
            ? this.props.verticalAlign in CustomVerticalAlignOptions
                ? "h-flex-v-align-" + CustomVerticalAlignOptions[this.props.verticalAlign]
                : ""
            : "";

        const processedClassName = joinClasses(
            this.props.className || "",
            spacingClassNames || "",
            contrastColorClass,
            backgroundColorClass,
            horizontalAlignClass,
            verticalAlignClass);

        return (
            <div style={this.props.style} className={processedClassName}>
                {this.props.children}
            </div>
        );
    }






};

export default CustomStyle;
