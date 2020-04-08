import React, { useRef } from 'react';

// Icons
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';

const ProfileReferralLink = ({referralLink}) => {
    const inputRef = useRef();

    function copyReferralLinkToClipboard() {
        inputRef.current.select();
        document.execCommand('copy');
    }

    return (
        <div 
            className="profile__menu--referral-link"
            onClick={copyReferralLinkToClipboard}>
            <input
                ref={inputRef}
                type="text"
                value={referralLink}
                readOnly />
            <LinkRoundedIcon />
        </div>
    )
}

export default ProfileReferralLink;