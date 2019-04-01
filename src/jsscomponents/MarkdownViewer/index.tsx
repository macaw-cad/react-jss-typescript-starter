import * as React from 'react';
import Markdown from '../../components/Markdown';

type MarkdownViewerFields = {
    body: { value: string };
    url: { value: string };
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
            if (props.fields.body && props.fields.body.value.trim() !== '') {
                this.state = { text: props.fields.body.value };
            }
            else if (props.fields.url) {
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
        if (this.props.fields && this.props.fields.url) {
            const markdownDocumentUrl = this.props.fields.url.value;
            fetch(markdownDocumentUrl, { cache: 'reload' }) // don't cache
                .then(response => response.text())
                .then(text => this.setState({ text }));
        }
    }

    render() {
        const { text } = this.state;
        const imgBaseUrl = this.props.fields.url ? 
            this.props.fields.url.value.substring(0, this.props.fields.url.value.lastIndexOf("/")) :
            './'; //if markdown defined in body we leave urls starting with ./ the same

        return (
            <Markdown body={text} imgBaseUrl={imgBaseUrl}/>         
        )
    }
};

export default MarkdownViewer;