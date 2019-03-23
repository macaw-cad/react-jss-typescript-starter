// utility
import * as React from "react";

export default class ClientRender extends React.Component<any, any> {
    state = { isMounted: false };

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        const { children } = this.props;
        const { isMounted } = this.state;

        return isMounted ? children : null;
    }
}