import * as React from 'react';
import Markdown from '../../components/Markdown';
import { Environment } from '../../Environment';

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
    constructor(props: MarkdownViewerProps) {
        super(props);
        const margin = props.fields.margin? props.fields.margin.value : '';
        if (props.fields) {
            if (props.fields.body && props.fields.body.value.trim() !== '') {
                this.state = { text: props.fields.body.value, margin: margin };
            }
            else if (props.fields.url && props.fields.url.value.trim() !== '') {
                this.state = { text: 'Loading', margin: margin };
            }
            else {
                this.state = { text: 'No Markdown text specified', margin: margin };
            }
        } else {
            this.state = { text: 'No Markdown text specified', margin: margin };
        }
    }

    componentDidMount() {
        if (this.props.fields && this.props.fields.url && this.props.fields.url.value.trim() !== '') {
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
            `${Environment.homeUrl}/`; //if markdown defined in body we leave urls starting with ./ the same

        return (
            <div style={{ margin: margin}}><Markdown body={text} imgBaseUrl={imgBaseUrl}/></div>         
        )
    }
};

export default MarkdownViewer;