import React from 'react';

// Dropbox API class
import { dbx } from '../../utils/api';

// Components
import LandingCardHeader from './LandingCardFooter';
import LandingCardFooter from './LandingCardHeader';

const LandingCard = () => {
    return (
        <section className='card'>
            <LandingCardHeader />
            <div className='card__connect'>
                <a href={dbx.getAuthenticationUrl('http://localhost:3000/')}>
                    Connect with Dropbox
				</a>
                <span>
                    By connecting you agree to <span>matryoshka</span> gaining <br />
					access to <span>all your files</span>.
				</span>
            </div>
            <LandingCardFooter />
        </section>
    );
};

export default LandingCard;
