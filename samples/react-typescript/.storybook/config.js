import { configure } from '@storybook/react';
import './storybook.scss';

import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'JSS Design System'
});

const req = require.context('../src/components', true, /stories.tsx$/);
function loadStories() {
  req.keys().forEach(function (filename) { req(filename) });
}

configure(loadStories, module);