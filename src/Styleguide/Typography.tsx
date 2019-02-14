import React from 'react';

export class Typography extends React.Component {
    public componentDidMount(): void {
        var rows = document.querySelectorAll('.table tr');
        for (var i = 0; i < rows.length; i++) {
            var fontElem = rows[i].querySelector('[data-font]');
            var fontTarget = rows[i].querySelector('[data-font-size]');

            if (fontElem && fontTarget) {
                var fontSize = window.getComputedStyle(fontElem).fontSize;

                if (fontSize) {
                    fontTarget.innerHTML = fontSize;
                }
            }
        }
    }

    public render(): JSX.Element {
        return (
        <table className="table">
            <tbody>
                <tr>
                    <th>Heading</th>
                    <th>Font size</th>
                    <th>Example</th>
                </tr>
                {[1, 2, 3, 4, 5, 6].map((size, index) => {
                    const Heading = `h${size}`; 
                    return (
                        <tr>
                            <td><code>&lt;h{size}&gt;&lt;/h{size}&gt;</code></td>
                            <td><code data-font-size={true} /></td>
                            {/* <td><Heading data-font={true}>Heading size: H{size}</Heading></td> */}
                        </tr>
                    );
                })}
            </tbody>
        </table>
        );
    }
}