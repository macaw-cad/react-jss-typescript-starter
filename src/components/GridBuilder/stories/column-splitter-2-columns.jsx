import { select, text } from '@storybook/addon-knobs';
import GridBuilder from '..';
import React from 'react';

export const columnSplitter2 = () => {

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
  
  const content = text('Content column', "The Lady of the Lake, her arm clad in the purest shimmering samite, held aloft Excalibur from the bosom of the water, signifying by divine providence that I, Arthur, was to carry Excalibur. That is why I am your king. We shall say Ni again to you, if you do not appease us.");

  return (
    <div className="grid-highlight">
      <GridBuilder columns={[widthFirstColumn, widthSecondColumn]} >
          <div className="content">
            {content}
          </div>
          <div className="content">
            {content}
          </div>
        </GridBuilder>
    </div>
  );
};
