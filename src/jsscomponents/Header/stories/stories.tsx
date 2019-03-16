/* tslint:disable */
import { withReadme } from 'storybook-readme';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import { header } from './header';
const readme = require("./README.md");


storiesOf('Header', module)
    .addDecorator(withKnobs)
    .add('Static', withReadme(readme, header))
