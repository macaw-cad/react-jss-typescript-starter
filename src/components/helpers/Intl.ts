
const getNavigatorLanguage = () => document.getElementsByTagName('html')[0].getAttribute('lang') || 'en-US';
const getDateLabel = (value: any, format?: any) => {
    let date: any;
    if (!format) {
        format = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            timeZone: 'UTC'
        };
    }
    try {
        date =  new Date(Date.parse(value));
    } catch (e) {
        // do nothing
    }
    if (date) {
        return new Intl.DateTimeFormat(getNavigatorLanguage(), format).format(date);
    } else {
        return value;
    }
}

export const IntlHelpers = {
    getNavigatorLanguage,
    getDateLabel
}