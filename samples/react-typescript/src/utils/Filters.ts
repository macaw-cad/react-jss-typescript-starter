type arrayClass = (string | undefined);

export const joinClasses = (...classes: arrayClass[]): string => {
    return classes.filter((c) => !!c).join(' ');
};

export const isFilterItemMultiSelect = (type: string): boolean => {
    if (type && type.toLowerCase().includes('multiselect')) {
        return true;
    }

    return false;
};
