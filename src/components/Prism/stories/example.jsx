import React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Prism from '../index';

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`.trim()

export const prism = () => {
    return (
        <div className="storybook-breakout h-spacing-pt__5">
            <div className="h-shadow--3">
                <Prism code={exampleCode} />
            </div>
        </div>
    );
}
