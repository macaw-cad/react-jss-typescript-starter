import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './headers/Header';

storiesOf('Header', module)
    .add('default', () => ( 
       <Header name="page-structure-header" />
    ));