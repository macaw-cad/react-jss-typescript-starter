import * as React from 'react';
import Markdown from '../../components/Markdown';
import { getFieldValue } from '@sitecore-jss/sitecore-jss-react';

type MarkdownViewerFields = {
    body: { value: string };
    url: { value: string };
};
type MarkdownViewerProps = {
    fields: MarkdownViewerFields;
};

type MarkdownViewerState = {
    text: string;
};

class MarkdownViewer extends React.Component<MarkdownViewerProps, MarkdownViewerState> {
    constructor(props: MarkdownViewerProps) {
        super(props);
        const body = getFieldValue(props.fields, 'body');
        if (body) {
            this.state = { text: body };
        } else if (getFieldValue(props.fields, 'url')) {
            this.state = { text: 'Text is loading' };
        } else {
            this.state = { text: 'No Markdown text specified' };
        }
    }

    public componentDidMount(): void {
        const url = getFieldValue(this.props.fields, 'url');
        if (url) {
            fetch(url, { cache: 'reload' }) // don't cache
                .then(response => response.text())
                .then(text => this.setState({ text }));
        }
    }

    public render(): JSX.Element {
        const { text } = this.state;
        const url = getFieldValue(this.props.fields, 'url');

        const imgBaseUrl = url ? url.substring(0, url.lastIndexOf('/')) : './';
        return (
            <Markdown body={text} imgBaseUrl={imgBaseUrl}/>         
        );
    }
}

export default MarkdownViewer;