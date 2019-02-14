import * as React from 'react'; 
import { FormattedMessage } from 'react-intl';
import { ToastContent } from '../toast/ToastContent';

// const toastLibrary = require('react-toastify/dist/ReactToastify');
// const { toast } = toastLibrary;

export type ErrorProps = {
    message?: string;
};

type ErrorAllProps = ErrorProps;

export class Error extends React.Component<ErrorAllProps> {
    private preventDuplicateToastId: string = 'toast:error';

    public componentDidMount(): void {
        // toast.error(<ToastContent type="error">{this.getErrorMessage()}</ToastContent>, {
        //     toastId: this.preventDuplicateToastId
        // });
    }

    public render(): JSX.Element {
        return (
            <div className="a-error">
                {this.getErrorMessage()}
            </div>
        );
    }

    private getErrorMessage(): JSX.Element {
        return <FormattedMessage id={this.props.message || 'Component.error'} defaultMessage="Error receiving the data" />;
    }
}