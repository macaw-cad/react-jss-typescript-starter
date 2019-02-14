import React from 'react';
import IconSprite from '../icons/Sprite';
import { FormattedMessage } from 'react-intl';

type ToastContentProps = {
    type?: string;
};

export const ToastContent: React.SFC<ToastContentProps> = ({ type, children }) => {
    const titleMap: { [key: string]: string } = {
        default: 'Notification',
        success: 'Success',
        info: 'Notification',
        warning: 'Warning',
        error: 'Error'
    };

    return (
        <div className="a-toast__content">
            <div className="a-toast__title xs-mb">
                {type 
                    ? <FormattedMessage id={`Toast.${titleMap[type]}`} defaultMessage={titleMap[type]} /> 
                    : <FormattedMessage id={`Toast.${titleMap.default}`} defaultMessage={titleMap.default} />
                }
            </div>
            {children}
        </div>
    );
};