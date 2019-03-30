import * as React from 'react';
import Markdown from '../../components/Markdown';

type MarkdownViewerFields = {
    body: { value: string };
    baseUrl: { value: string };
    fileName: { value: string };
}
type MarkdownViewerProps = {
    fields: MarkdownViewerFields;
};

type MarkdownViewerState = {
    text: string;
};

class MarkdownViewer extends React.Component<MarkdownViewerProps, MarkdownViewerState> {
    state: Readonly<MarkdownViewerState> = { text: 'Loading' };
    constructor(props: MarkdownViewerProps) {
        super(props);
        if (props.fields) {
            if (props.fields.body) {
                this.state = { text: props.fields.body.value };
            }
            else if (props.fields.baseUrl && props.fields.fileName) {
                this.state = { text: 'Loading' };
            }
            else {
                this.state = { text: 'No Markdown text specified' };
            }
        } else {
            this.state = { text: 'No Markdown text specified' };
        }
    }

    componentDidMount() {
        if (this.props.fields && this.props.fields.baseUrl && this.props.fields.fileName) {
            const markdownDocumentUrl = `${this.props.fields.baseUrl.value}/${this.props.fields.fileName.value}`;
            fetch(markdownDocumentUrl, { cache: 'reload' }) // don't cache
                .then(response => response.text())
                .then(text => this.setState({ text }));
        }
    }

    render() {
        const { text } = this.state;
        const imgBaseUrl = (this.props.fields && this.props.fields.baseUrl) ? this.props.fields.baseUrl.value : '/';
        return (
            <Markdown body={text} imgBaseUrl={imgBaseUrl}/>         
        )
    }
};

export default MarkdownViewer;
