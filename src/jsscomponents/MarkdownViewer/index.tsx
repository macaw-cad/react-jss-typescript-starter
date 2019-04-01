import * as React from 'react';
import Markdown from '../../components/Markdown';

type MarkdownViewerFields = {
    body: { value: string };
    url: { value: string };
    margin: {value: string };
}
type MarkdownViewerProps = {
    fields: MarkdownViewerFields;
};

type MarkdownViewerState = {
    text: string;
    margin: string;
};

class MarkdownViewer extends React.Component<MarkdownViewerProps, MarkdownViewerState> {
    state: Readonly<MarkdownViewerState> = { text: 'Loading', margin: '' };
    constructor(props: MarkdownViewerProps) {
        super(props);
        if (props.fields) {
            if (props.fields.body) {
                this.state = { text: props.fields.body.value, margin: props.fields.margin.value };
            }
            else if (props.fields.url) {
                this.state = { text: 'Loading', margin: props.fields.margin.value };
            }
            else {
                this.state = { text: 'No Markdown text specified', margin: props.fields.margin.value };
            }
        } else {
            this.state = { text: 'No Markdown text specified', margin: '' };
        }
    }

    componentDidMount() {
        if (this.props.fields && this.props.fields.url) {
            const markdownDocumentUrl = this.props.fields.url.value;
            fetch(markdownDocumentUrl, { cache: 'reload' }) // don't cache
                .then(response => response.text())
                .then(text => this.setState({ text }));
        }
    }

    render() {
        const { text, margin } = this.state;
        const imgBaseUrl = this.props.fields.url ? 
            this.props.fields.url.value.substring(0, this.props.fields.url.value.lastIndexOf("/")) :
            './'; //if markdown defined in body we leave urls starting with ./ the same

        return (
            <div style={{ margin: margin}}><Markdown body={text} imgBaseUrl={imgBaseUrl}/></div>         
        )
    }
};

export default MarkdownViewer;