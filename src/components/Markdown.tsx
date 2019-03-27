import * as React from 'react';
var Remarkable = require('remarkable');

interface MarkdownConfig {
    html: boolean,        // Enable HTML tags in source
    xhtmlOut: boolean,        // Use '/' to close single tags (<br />)
    breaks: boolean,        // Convert '\n' in paragraphs into <br>
    langPrefix: string,  // CSS language prefix for fenced blocks
    linkify: boolean,        // Autoconvert URL-like text to links
    // Enable some language-neutral replacement + quotes beautification
    typographer: boolean,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: string,
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed
    highlight: () => string;
}

interface Props {
    body: string;
    config?: MarkdownConfig;
    imgBaseUrl: string;
};

interface State {
};

class Markdown extends React.Component<Props, State> {
    render() {
        let markdownConfig: MarkdownConfig = {} as MarkdownConfig;
        const { config, body } = this.props;
        if (config) {
            markdownConfig = config
        } else {
            markdownConfig = {
                html: true,
                xhtmlOut: true,
                breaks: false,
                langPrefix: 'language-',
                linkify: true,
                typographer: false,
                quotes: '“”‘’',
                highlight: function (/*str, lang*/) { return ''; }
            }
        }
        var md = new Remarkable(markdownConfig);
        md.core.ruler.enable([
            'abbr'
          ]);
          md.block.ruler.enable([
            'footnote',
            'deflist'
          ]);
          md.inline.ruler.enable([
            'footnote_inline',
            'ins',
            'mark',
            'sub',
            'sup'
          ]);
        
        let html = md.render(body);
        if (this.props.imgBaseUrl) {
            html = html.replace(/<img src="\.\//g, `<img style="max-width: 100%" src="${this.props.imgBaseUrl}/`);
        }

        return (
            <span className="o-markdown" dangerouslySetInnerHTML={{ __html: html }}></span>
        )
    }
};

export default Markdown;
