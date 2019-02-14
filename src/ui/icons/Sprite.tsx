import * as React from 'react';
import { StyleSheet, css } from '../../Styles';
import { StyleDeclarationValue } from 'aphrodite';

// Code to obtain original viewBox
// var clientrect = document.querySelector('svg path').getBBox();console.log(clientrect.x+' '+clientrect.y+' '+clientrect.width+' '+clientrect.height);

const styles = StyleSheet.create({
    icon: {
        display: 'block',
        userSelect: 'none'
    },
});

export const sprite = {
    check: (
        <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" fill="none" fillRule="evenodd">
                <g id="Design-System---Icons">
                    <g id="Icon-/-Check---25px-/-Green">
                        <g id="Check">
                            <rect id="Rectangle-path" width="25" height="25" />
                            <polygon id="Shape" fill="#58BB81" fillRule="nonzero" points="23.76 5.61 22.7 4.54 8.91 18.34 2.3 11.72 1.24 12.78 8.91 20.45 8.91 20.45 8.91 20.45"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    ),
    close: (
        <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" fill="none" fillRule="evenodd">
                <g id="Design-System---Icons" transform="translate(-194 -418)">
                    <g id="Icon-/-Close---25px-/-Black" transform="translate(193 417)">
                        <g id="Close">
                            <rect id="Rectangle-path" width="25" height="25" />
                            <path d="M23,23 L2,2" id="Shape" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M2,23 L23,2" id="Shape" stroke="currentColor" strokeWidth="1.5" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    ),
    danger: (
        <svg version="1.1" viewBox="0 0 24 24">
            <g id="Rolodex---Notification" fill="none" stroke="none" strokeWidth="1">
                <g id="Tablet---Notification---Error" transform="translate(-715.000000, -652.000000)">
                    <g id="Molecule-/-Notification-/-Default-Copy" transform="translate(689.000000, 631.000000)">
                        <g id="Icon-/-Warning-Rounded---25px-/-Danger" transform="translate(25.000000, 20.000000)">
                            <g id="Warning-Rounded" transform="translate(2.000000, 1.000000)">
                                <text id="!" fill="currentColor" style={{ fontFamily: 'Precious Sans Two', fontWeight: 600, fontSize: '18px' }}>
                                    <tspan x="8" y="18">!</tspan>
                                </text>
                                <circle id="Oval" cx="10.75" cy="11.75" r="10.75" stroke="currentColor" strokeWidth="1.5" />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
};

export type IconNames = keyof typeof sprite;

export interface IconSpriteProps {
    name: IconNames;
    className?: StyleDeclarationValue;
    onClick?: (event: React.SyntheticEvent<Element>) => void;
}

const Sprite = ({ name, className, onClick }: IconSpriteProps) => {
    return (sprite[name]) ?
        <span className={css(styles.icon, className)} onClick={onClick}>{sprite[name]}</span>
        : null;
};

export default Sprite;