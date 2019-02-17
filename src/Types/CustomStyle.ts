type SpacingValues = Partial<Readonly<{
    l: number;
    r: number;
    t: number;
    b: number;
    x: number;
    y: number;
}>>;

export type CustomSpacingsProps = Partial<Readonly<{
    "": SpacingValues;
    S: SpacingValues;
    M: SpacingValues;
    L: SpacingValues;
    XL: SpacingValues;
}>> | number;

export interface CustomStyleParametersProps {
    verticalSpacingTop?: string; // will be number in string format
    verticalSpacingBottom?: string; // will be number in string format
    verticalSpacing?: string; // will be number in string format
    negativeMargin?: string; // will be number in string format
    horizontalAlign?: string; // CustomHorizontalAlignOptions
    verticalAlign?: string; // CustomVerticalAlignOptions
    contrastColor?: string; // will be 0 or 1 in string format
    backgroundColor?: string; // CustomBackgroundColors
    className?: string;
    style?: {[key: string]: string};
}

export enum CustomHorizontalAlignOptions {
    left = "left",
    center = "center",
    right = "right",
    spaceBetween = "space-between",
}

export enum CustomVerticalAlignOptions {
    top = "top",
    center = "center",
    bottom = "bottom",
}

export enum CustomButtonColors {
    default = 'default',
}

export enum CustomButtonSizes {
    tiny = "tiny",
    normal = "normal",
    big = "big",
}

export enum CustomBackgroundColors {
    default = 'default',
    brandPrimary = 'brand-primary',
    brandSecondary = 'brand-secondary',
    brandTertiary = 'brand-tertiary',
    contrastPrimary = 'contrast-primary',
    contrastSecondary = 'contrast-secondary',
    contrastTertiary = 'contrast-tertiary',
}