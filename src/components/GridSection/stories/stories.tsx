/* tslint:disable */
import { withReadme } from 'storybook-readme';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import { section } from './grid-section';
const readme = require("./README.md");

storiesOf('Grid Section', module)
    .addDecorator(withKnobs)
    .add('Section', withReadme(readme, section))
