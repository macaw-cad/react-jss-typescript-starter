import * as React from 'react';
import { Pre, LineNo } from '../helpers/Prism'
import Highlight, { defaultProps, PrismTheme } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

interface Props {
    code: string
}

export default class Prism extends React.Component<Props> {
    render() {
        return (
            <Highlight {...defaultProps} theme={theme} code={this.props.code} language="jsx">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <Pre className={className} style={style}>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                <LineNo>{i + 1}</LineNo>
                                {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                            </div>
                        ))}
                    </Pre>
                )}
            </Highlight>
        )
    }
}
