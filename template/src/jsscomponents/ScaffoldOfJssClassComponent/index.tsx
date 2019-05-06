import * as React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
 
import { ScaffoldOfJssClassComponentBaseProps } from './ScaffoldOfJssClassComponent.props';

type ScaffoldOfJssClassComponentProps = ScaffoldOfJssClassComponentBaseProps & {
    // Additional properties not matching fields as defined in sitecore/definitions/components/ScaffoldOfJssClassComponent.sitecore.ts
};
 
type ScaffoldOfJssClassComponentState = { strong: boolean };

class ScaffoldOfJssClassComponent extends React.Component<ScaffoldOfJssClassComponentProps, ScaffoldOfJssClassComponentState> {
    constructor(props: ScaffoldOfJssClassComponentProps) {
        super(props);
        this.state = { strong: false };
    }

    public render(): JSX.Element {
        const fields = this.props.fields;

        return (
            <div>
                <h2>
                    Class Component: <strong>ScaffoldOfJssClassComponent</strong>
                </h2>
                <Text tag="h5" field={fields.heading as any} />
            </div>
        )
    }

    private toggleStrong(): void {
    }
};

export default ScaffoldOfJssClassComponent;
