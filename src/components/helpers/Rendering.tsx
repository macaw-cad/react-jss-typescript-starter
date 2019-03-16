import * as React from 'react';
import { react } from 'babel-types';

interface Props {
    name: string;
}

interface State {

}

class Rendering extends React.Component<Props, State> {
    render() {
        return this.props.children;
    }
}

export default Rendering;