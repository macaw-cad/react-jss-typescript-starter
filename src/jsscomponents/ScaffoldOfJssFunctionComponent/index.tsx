import * as React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
 
import { ScaffoldOfJssFunctionComponentBaseProps } from './ScaffoldOfJssFunctionComponent.props';

type ScaffoldOfJssFunctionComponentProps = ScaffoldOfJssFunctionComponentBaseProps & {
    // Additional properties not matching fields as defined in sitecore/definitions/components/ScaffoldOfJssFunctionComponent.sitecore.ts
};
 
const ScaffoldOfJssFunctionComponent: React.FunctionComponent<ScaffoldOfJssFunctionComponentProps> = ({ fields }) => {
  var divStyle = {
    border: '5px'
  };

  return (
    <div style={divStyle}>
        <h2>
            Function Component: <strong>ScaffoldOfJssFunctionComponent</strong>
        </h2>
        <Text tag="h5" field={fields.heading as any} />
    </div>
  );
}

export default ScaffoldOfJssFunctionComponent;
