import React from 'react';

import { ReactComponent as StrawberryMint } from './assets/mint-strawberry-doll.svg';
import { ReactComponent as BlueberryVanilla } from './assets/blueberry-vanilla-doll.svg';
import { ReactComponent as ViolaFlower } from './assets/viola-flower-doll.svg';

const LandingCardFooter = () => {
    return (
        <footer className='card__footer'>
            <div className='dolls'>
                <div className='strawberryMint doll'>
                    <StrawberryMint />
                </div>
                <div className='blueberryVanilla doll'>
                    <BlueberryVanilla />
                </div>
                <div className='violaFlower doll'>
                    <ViolaFlower />
                </div>
            </div>
        </footer>
    );
};

export default LandingCardFooter;
