import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from '../Markdown';

storiesOf('Markdown', module)
    .add('with text', () => {
        const markdownText = `
# Markdown sample text
This is a sample of Markdown text
- Line one
- Line two

\`\`\`typescript
function testCodeHighlighting(a: string, b: int): void {
    return 'get highlighted';
}
\`\`\`
`;
        return <Markdown body={markdownText}/>;
    });