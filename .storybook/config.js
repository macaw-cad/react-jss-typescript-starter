import { configure } from '@storybook/react';
import '../src/assets/css/app.scss';
import '../src/assets/css/storybook-style.css';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'JSS Design System'
}); 

const req = require.context('../src', true, /stories.tsx$/);
function loadStories() {
  require('../src/Styleguide/index.tsx');
  req.keys().forEach(function(filename) { req(filename) });
}

configure(loadStories, module);