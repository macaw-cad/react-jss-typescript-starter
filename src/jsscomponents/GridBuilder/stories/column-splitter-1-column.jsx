import { text } from '@storybook/addon-knobs';
import GridBuilder from '..';
import React from 'react';

export const columnSplitter1 = () => {

  const content = text('Content column', "The Lady of the Lake, her arm clad in the purest shimmering samite, held aloft Excalibur from the bosom of the water, signifying by divine providence that I, Arthur, was to carry Excalibur. That is why I am your king. We shall say Ni again to you, if you do not appease us.");

  return (
    <div className="grid-highlight">
      <GridBuilder columns={[12]} >
          <div className="content">
            {content}
          </div>
        </GridBuilder>
    </div>
  );
};
