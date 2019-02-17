import * as React from "react";
import { CustomStyleParametersProps } from "../../types/CustomStyle";
import { joinClasses } from "../../utils/Filters";
import CustomStyle from "../../containers/CustomStyle";
import { Placeholder } from "../../containers/Placeholder";

export interface GridBuilderProps {
  smallColumns?: number[];
  columns: number[];
  largeColumns?: number[];
  extraLargeColumns?: number[];
  placeholders?: any;
  parameters?: CustomStyleParametersProps;
}

const GridBuilder: React.SFC<GridBuilderProps> = (
  { smallColumns, columns, largeColumns, extraLargeColumns, placeholders, parameters, children }) => {

  let newParameters = { ...parameters } as CustomStyleParametersProps;

  if (!newParameters) {
    newParameters = {
      className: "m-grid",
    };
  } else if (newParameters.className === undefined) {
    newParameters.className = "m-grid";
  } else if (newParameters && (newParameters.className !== undefined)) {
    newParameters.className = newParameters.className.concat(" m-grid");
  }

  return (
    <CustomStyle {...newParameters}>
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
            <Placeholder children={children} placeholders={placeholders} placeholderIndex={index} />
          </div>
        );
      })}
    </CustomStyle>
  )
};

export default GridBuilder;
