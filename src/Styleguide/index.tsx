import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Typography } from './Typography';
import { Icons } from './Icons';
import { Colors } from './Colors';

storiesOf('Styleguide', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
      <div>Design system intro</div>
  ))
  .add('Colors', () => (
    <Colors />
  ))
  .add('Typography', () => (
    <Typography />
  ))
  .add('Icons', () => (
    <Icons />
  ));