/* tslint:disable */
import { withReadme } from 'storybook-readme';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';

import { columnSplitter1 } from './column-splitter-1-column';
import { columnSplitter2 } from './column-splitter-2-columns';
import { columnSplitter3 } from './column-splitter-3-columns';
import { columnSplitter4 } from './column-splitter-4-columns';

const ColumnSplitterReadme = require("./README.md");

const content = text('Content column', "The Lady of the Lake, her arm clad in the purest shimmering samite, held aloft Excalibur from the bosom of the water, signifying by divine providence that I, Arthur, was to carry Excalibur. That is why I am your king. We shall say Ni again to you, if you do not appease us.");


storiesOf('Grid Builder', module)
    .addDecorator(withKnobs)
    .add('1 column', withReadme(ColumnSplitterReadme, columnSplitter1))
    .add('2 columns', withReadme(ColumnSplitterReadme, columnSplitter2))
    .add('3 columns', withReadme(ColumnSplitterReadme, columnSplitter3))
    .add('4 columns', withReadme(ColumnSplitterReadme, columnSplitter4))
