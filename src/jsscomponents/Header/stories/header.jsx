import React from 'react';
import Header from '../index';
import Hero from '../../Hero/index';

export const header = () => {
    return (
        <React.Fragment>
            <Header />
            <Hero/>
        </React.Fragment>
    );
}
