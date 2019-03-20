import * as React from 'react';
import Markdown from '../../components/Markdown';

type ReadMeProps = {
};

type ReadMeState = {
    text: string;
};

class ReadMe extends React.Component<ReadMeProps, ReadMeState> {
    state: Readonly<ReadMeState> = { text: 'Loading' };

    componentDidMount() {
        const readmeMarkdownFile = '/documentation/README.md';
        fetch('/documentation/README.md', { cache: 'reload' }) // don't cache
            .then(response => response.text())
            .then(text => this.setState({ text }));
    }

    render() {
        const { text } = this.state;

        return (
            <Markdown body={text} />         
        )
    }
};

export default ReadMe;
