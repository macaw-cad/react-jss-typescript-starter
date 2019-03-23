
const getNavigatorLanguage = () => document.getElementsByTagName('html')[0].getAttribute('lang') || 'en-US';
const getDateLabel = (value: any, format?: any) => {
    let date: any;
    if (!format) {
        format = {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        };
    }
    try {
        date =  new Date(Date.parse(value));
    } catch (e) {
        // do nothing
    }
    if (date) {
        var utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return new Intl.DateTimeFormat(getNavigatorLanguage(), format).format(utc);
    } else {
        return value;
    }
}

export const IntlHelpers = {
    getNavigatorLanguage,
    getDateLabel
}