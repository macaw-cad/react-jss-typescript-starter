import * as React from 'react';
import { withPlaceholder, withSitecoreContext, getFieldValue } from '@sitecore-jss/sitecore-jss-react';
import { joinClasses } from '../../utils/Filters';

interface GridColumnsProps {
    smallColumns?: number[];
    columns: number[];
    largeColumns?: number[];
    extraLargeColumns?: number[];
    rendering?: any;
    parameters?: any;
    fields?: any;
}

interface GridColumnsFields {
    columns: { value: string };
}

class GridColumnsComponent extends React.Component<GridColumnsProps> {
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
        const columnsString = getFieldValue(this.props.fields, 'columns');
        const columns = columnsString.indexOf(',') > -1 ? columnsString.split(',') : ['12'];

        return (
            <div className='m-grid'>
                {columns && columns.map((column, index) => {
                    const GridColumnClassName = joinClasses(
                        `m-grid__M${column}`,
                        (smallColumns !== undefined && smallColumns[index])
                            ? `m-grid__S${smallColumns[index]}` : undefined,
                        (largeColumns !== undefined && largeColumns[index])
                            ? `m-grid__L${largeColumns[index]}` : '',
                        (extraLargeColumns !== undefined && extraLargeColumns[index])
                            ? `m-grid__XL${extraLargeColumns[index]}` : '',
                    );
                    return (
                        <div key={index} className={GridColumnClassName}>
                            {
                                this.props[`placeholder${index+1}`]
                            }
                        </div>
                    );
                })}
            </div >
        )
    }
}

const gridColumnsComponentWithPlaceholderInjected = withPlaceholder([
    {
        placeholder: 'jss-grid-column-1',
        prop: 'placeholder1',
    },
    {
        placeholder: 'jss-grid-column-2',
        prop: 'placeholder2',
    },
    {
        placeholder: 'jss-grid-column-3',
        prop: 'placeholder3',
    },
    {
        placeholder: 'jss-grid-column-4',
        prop: 'placeholder4',
    },
    {
        placeholder: 'jss-grid-column-5',
        prop: 'placeholder5',
    },
    {
        placeholder: 'jss-grid-column-6',
        prop: 'placeholder6',
    },
    {
        placeholder: 'jss-grid-column-7',
        prop: 'placeholder7',
    },
    {
        placeholder: 'jss-grid-column-8',
        prop: 'placeholder8',
    },
    {
        placeholder: 'jss-grid-column-9',
        prop: 'placeholder9',
    },
    {
        placeholder: 'jss-grid-column-10',
        prop: 'placeholder10',
    },
    {
        placeholder: 'jss-grid-column-11',
        prop: 'placeholder11',
    },
    {
        placeholder: 'jss-grid-column-12',
        prop: 'placeholder12',
    }
]
)(GridColumnsComponent);

// We need to know if experience editor is active, to disable the dynamic tab behavior for editing.
// Using the same technique as injecting the placeholder, we wrap the component again to inject the
// `sitecoreContext` prop.
const GridColumns = withSitecoreContext()(
    gridColumnsComponentWithPlaceholderInjected
);

export default GridColumns;
