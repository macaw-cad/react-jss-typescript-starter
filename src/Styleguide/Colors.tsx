import React from 'react';
import { colors } from '../assets/css/style';

type ColorList = {
    key: string;
    color: string;
}[];

export class Colors extends React.Component {
    private colorList: ColorList = [];

    public render(): JSX.Element {
        const mappedColors = this.iterate(colors, '');
        return (
            <table className="table color-table">
                <tbody>
                    <tr>
                        <th>Token</th>
                        <th>Value</th>
                        <th>Example</th>
                    </tr>
                    {mappedColors.map((color, index) => {
                        return (
                            <tr key={index}>
                                <td><code>{color.key}</code></td>
                                <td><code>{color.color}</code></td>
                                <td>
                                    <span className="color" style={{
                                        backgroundColor: color.color
                                    }} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    // Got this from https://stackoverflow.com/a/15690816/1223588
    private iterate(obj: any, stack: string): ColorList {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] === 'object') {
                    console.log(stack, property);
                    this.iterate(obj[property], (stack ? (stack + '.') : '') + property);
                } else {
                    const stackName = stack + '.' + property;
                    this.colorList.push({
                        key: stackName,
                        color: obj[property]
                    });
                }
            }
        }

        return this.colorList;
    }
}