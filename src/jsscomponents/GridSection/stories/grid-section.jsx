import React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { CustomStyleParametersProps } from "../../../components/CustomStyle";
import GridSection from '../../GridSection';
import { storiesOf } from '@storybook/react';

export const section = () => {
    return (
        <div className="storybook-breakout h-spacing-pt__5">
            <div className="h-shadow--3">
                <GridSection
                    heading={{value: ''}}
                    parameters={{
                        title: text('Title', 'Section title'),
                        backgroundColor:
                            select('Background Color', {
                                brandPrimary: 'brandPrimary',
                                brandSecondary: 'brandSecondary',
                                brandTertiary: 'brandTertiary',
                                contrastPrimary: 'contrastPrimary',
                                contrastSecondary: 'contrastSecondary',
                                contrastTertiary: 'contrastTertiary',
                            }, 'brandPrimary')
                    }}
                >
                    <CustomStyle style={ { minHeight: '30vh'}}/>
                </GridSection>
            </div>
        </div>
    );
}
