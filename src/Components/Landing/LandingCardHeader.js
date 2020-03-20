import React from 'react';

import { ReactComponent as Logo } from '../../assets/logo.svg';

const LandingHeader = () => {
    return (
        <header className='card__header'>
            <div className='logo'>
                <Logo />
            </div>
            <div className='name'>
                <h1>matryoshka</h1>
            </div>
        </header>
    );
};

export default LandingHeader;
