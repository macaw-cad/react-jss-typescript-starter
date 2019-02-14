import * as React from "react";

import {
    CustomBackgroundColors,
    CustomHorizontalAlignOptions,
    CustomSpacingsProps,
    CustomStyleParametersProps,
    CustomVerticalAlignOptions,
} from "../Types/CustomStyle";
import { joinClasses } from "../utils/Filters";


interface CustomStyleProps extends CustomStyleParametersProps {
    createSpacingClassName?: any;
    generateSpacingClassesFromCustomParameters?: any;
}
const CustomStyle: React.SFC <CustomStyleProps> = (props) => {

    props.createSpacingClassName = (prop: string, spacing?: CustomSpacingsProps): string | undefined => {
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

    const {
        verticalSpacingTop= "",
        verticalSpacingBottom= "",
        verticalSpacing= "",
        negativeMargin= "",
    } = props;

    props.generateSpacingClassesFromCustomParameters = () => {

        let localSpacingClassNames = "";

        if (negativeMargin !== "") {

            const negativeMarginClass = props.createSpacingClassName("m", {
                "": {t: -negativeMargin} });

            localSpacingClassNames = joinClasses(localSpacingClassNames,
                negativeMarginClass ? negativeMarginClass : '');

        } else if (verticalSpacing !== "") {

            const verticalSpacingAsNumber = parseInt(verticalSpacing, 10);

            const verticalSpacingClass = props.createSpacingClassName("m", {
                "": {  y: verticalSpacingAsNumber - 1 },
                "M": {  y: verticalSpacingAsNumber },
            });

            localSpacingClassNames = joinClasses(
                localSpacingClassNames,
                verticalSpacingClass ? verticalSpacingClass : '');

        } else if (verticalSpacingTop !== "") {

            const verticalSpacingTopAsNumber = parseInt(verticalSpacingTop, 10);

            const verticalSpacingTopClass = props.createSpacingClassName("m", {
                "": {  t: verticalSpacingTopAsNumber - 1 },
                "M": {  t: verticalSpacingTopAsNumber },
            });

            localSpacingClassNames = joinClasses(localSpacingClassNames,
                verticalSpacingTopClass ? verticalSpacingTopClass : '');

        } else if (verticalSpacingBottom !== "") {

            const verticalSpacingBottomAsNumber = parseInt(verticalSpacingBottom, 10);

            const verticalSpacingBottomClass = props.createSpacingClassName("m", {
                "": {  b: verticalSpacingBottomAsNumber - 1 },
                "M": {  b: verticalSpacingBottomAsNumber },
            });

            localSpacingClassNames = joinClasses(localSpacingClassNames,
                verticalSpacingBottomClass ? verticalSpacingBottomClass : '');
        }

        return localSpacingClassNames;
    };

    const spacingClassNames = props.generateSpacingClassesFromCustomParameters(verticalSpacingTop,
        verticalSpacingBottom, verticalSpacing, negativeMargin);

    const backgroundColorClass = props.backgroundColor
    ? props.backgroundColor in CustomBackgroundColors
        ? "h-background-color--" + CustomBackgroundColors[props.backgroundColor]
        : "h-background-color--default"
    : "";

    const contrastColorClass = props.contrastColor === "1" ? "h-contrast" : "";

    const horizontalAlignClass = props.horizontalAlign
        ? props.horizontalAlign in CustomHorizontalAlignOptions
            ? "h-flex-h-align-" + CustomHorizontalAlignOptions[props.horizontalAlign]
            : ""
        : "";

    const verticalAlignClass = props.verticalAlign
        ? props.verticalAlign in CustomVerticalAlignOptions
            ? "h-flex-v-align-" + CustomVerticalAlignOptions[props.verticalAlign]
            : ""
        : "";

    const processedClassName = joinClasses(
    props.className || "",
    spacingClassNames || "",
    contrastColorClass,
    backgroundColorClass,
    horizontalAlignClass,
    verticalAlignClass);

    return (
        <div style={props.style} className={processedClassName}>
            { props.children }
        </div>
    );
};

export default CustomStyle;
