import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import GridBuilder from '.';

const content = text('Content column', "The Lady of the Lake, her arm clad in the purest shimmering samite, held aloft Excalibur from the bosom of the water, signifying by divine providence that I, Arthur, was to carry Excalibur. That is why I am your king. We shall say Ni again to you, if you do not appease us.");

const widths = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
}

const widthFirstColumn = select('Width column 1', widths, 6);
const widthSecondColumn = select('Width column 2', widths, 6);
const widthThirdColumn = select('Width column 3', widths, 4);

storiesOf('Grid Builder', module)
    .addDecorator(withKnobs)

    .add('1 column', () => (
        <div className="grid-highlight">
            <GridBuilder columns={[12]} >
                <div className="content">
                    {content}
                </div>
            </GridBuilder>
        </div>
    ))
    .addDecorator(withKnobs).add('2 columns', () => (
        <div className="grid-highlight">
            <GridBuilder columns={[widthFirstColumn, widthSecondColumn]} >
                <div className="content">
                    {content}
                </div>
            </GridBuilder>
        </div>
    ))
    .addDecorator(withKnobs).add('3 columns', () => (
        <div className="grid-highlight">
            <GridBuilder columns={[widthFirstColumn, widthSecondColumn, widthThirdColumn]} >
                <div className="content">
                    {content}
                </div>
                <div className="content">
                    {content}
                </div>
                <div className="content">
                    {content}
                </div>
            </GridBuilder>
        </div>
    ))
    .addDecorator(withKnobs).add('4 columns', () => (
        <div className="grid-highlight">
            <GridBuilder columns={[3, 3, 3, 3]} >
                <div className="content">
                    {content}
                </div>
                <div className="content">
                    {content}
                </div>
                <div className="content">
                    {content}
                </div>
                <div className="content">
                    {content}
                </div>
            </GridBuilder>
        </div>
    ));