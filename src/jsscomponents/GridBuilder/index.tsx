import * as React from 'react';
import { Text, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import CustomStyle from '../../containers/CustomStyle';
import { joinClasses } from '../../utils/Filters';
const uuidv1 = require('uuid/v1');

interface GridBuilderProps {
  smallColumns?: number[];
  columns: number[];
  largeColumns?: number[];
  extraLargeColumns?: number[];
  rendering?: any;
  parameters?: any;
  fields?: any;
}

class GridBuilder extends React.Component<GridBuilderProps> {
  constructor(props) {
    super(props);
    this.state = {
      className: "m-grid"
    };
  }
  render() {
    const { smallColumns, largeColumns, extraLargeColumns, parameters, rendering } = this.props;
    if (parameters && (parameters.className !== undefined)) {
      this.setState({
        className: parameters.className.concat(" m-grid")
      });
    }
    let columns = [];
    if (
      this.props &&
      this.props.fields &&
      this.props.fields.columns &&
      this.props.fields.columns.value) {
      columns = this.props.fields.columns.value.split(',');
    }

    return (
      <div>
        <CustomStyle {...this.state}>
          {columns && columns.map((column, index) => {
            const GridColumnClassName = joinClasses(
              `m-grid__M${column}`,
              (smallColumns !== undefined && smallColumns[index])
                ? `m-grid__S${smallColumns[index]}` : undefined,
              (largeColumns !== undefined && largeColumns[index])
                ? `m-grid__L${largeColumns[index]}` : "",
              (extraLargeColumns !== undefined && extraLargeColumns[index])
                ? `m-grid__XL${extraLargeColumns[index]}` : "",
            );
            return (
              <div key={index} className={GridColumnClassName}>
                <Placeholder name={`${'jss-grid-'}${index}`} rendering={rendering} />
              </div>
            );
          })}
        </CustomStyle>
      </div >
    )
  }
}

export default GridBuilder;
