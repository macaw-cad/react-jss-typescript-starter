import * as React from 'react';
import { Loader } from '../loader/Loader';
import { Error, ErrorProps } from '../error/Error';

type ComponentStatusProps = {
    loading?: boolean[];
    data?: any[];
};

type ComponentStatusAllProps = ComponentStatusProps & ErrorProps;

export class ComponentStatus extends React.Component<ComponentStatusAllProps> {
    public render(): JSX.Element {
        return (
            <>
                {this.hasError() && 
                    <Error message={this.props.message} />
                }

                {this.isLoading() &&
                    <Loader active={true} />
                }
            </>
        );
    }

    private isLoading(): boolean {
        const { loading } = this.props;

        if (!loading) {
            return false;
        }

        return loading.indexOf(true) > -1;
    }

    private hasError(): boolean {
        const { data } = this.props;

        if (!data) {
            return false;
        }

        return !this.isLoading() && data.indexOf(null) > -1;
    }
}