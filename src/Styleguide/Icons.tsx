import React from 'react';
import { StyleSheet } from '../Styles';
import Sprite, { sprite, IconNames } from '../ui/icons/Sprite';

export class Icons extends React.Component {
    public render(): JSX.Element {
        return (
            <table className={`table icon-table`}>
                <tbody>
                    <tr>
                        <th>Example</th>
                        <th>Value</th>
                    </tr>
                    {/* TODO: Fix code type */}
                    {Object.keys(sprite).map((code: any, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <Sprite className={styles.icon} name={code} />
                                </td>
                                <td><code>{code}</code></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: '30px'
    }
});