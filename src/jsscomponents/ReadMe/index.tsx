import * as React from 'react';
import Markdown from '../../components/Markdown';

interface Props {
    fields: any
};

interface State {
};

class ReadMe extends React.Component<Props, State> {
    render() {
        return (
            <Markdown body={this.props.fields.body.value} />         
        )
    }
};

export default ReadMe;
