import * as React from 'react';

interface LoaderProps {
    active: boolean;
}

type LoaderAllProps = LoaderProps;

export class Loader extends React.Component<LoaderAllProps> {
    public render(): JSX.Element | undefined {
        return this.props.active ? (
            <div className="a-loader">
                <h2>LOADING</h2>
                <div className="a-loader__spinner" />
            </div>
        ) : undefined;
    }
}