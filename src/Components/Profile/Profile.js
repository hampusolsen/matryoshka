import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { ReactComponent as Logo } from '../../assets/logo.svg';
import ProfileSignoutButton from './ProfileSignoutButton';
import ProfileUserInformation from './ProfileUserInformation';
import ReferralLink from './ProfileReferralLink';

const Profile = () => {
    const user = useSelector(state => state.user);

    if (!user.name) return null;

    return (
        <section className="profile">
            <Logo className="profile__logo" />
            <ProfileUserInformation user={user} />
            <div className="profile__menu">
                <ReferralLink referralLink={user.referral_link} />
                <ProfileSignoutButton />
            </div>
        </section>
    )
}

export default Profile;
