/* tslint:disable */
import { withReadme } from 'storybook-readme';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import { prism } from './example';

const readme = require("./README.md");

storiesOf('Prism Highlight', module)
    .addDecorator(withKnobs)
    .add('Prism', withReadme(readme, prism))
