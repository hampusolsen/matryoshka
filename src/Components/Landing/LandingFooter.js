import React from 'react';

// Icons
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const LandingFooter = () => {
    return (
        <footer className='landing__footer'>
            <div className='landing__footer__socials'>
                <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.linkedin.com/in/hampus-olsen-115b49138/'
                >
                    <LinkedInIcon />
                </a>
                <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://github.com/hampusolsen/matryoshka'
                >
                    <GitHubIcon />
                </a>
            </div>
        </footer>
    );
};

export default LandingFooter;
