import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../utils/SystemActions';

const ProfileSignoutButton = () => {
    const setGlobalState = useDispatch();

    function logout() {
        localStorage.removeItem('token');
        setGlobalState(setLoggedIn(false));
    }

    return (
        <button
            className="profile__menu--signout-button"
            type="button"
            onClick={logout} >
            SIGN OUT
        </button>
    )
}

export default ProfileSignoutButton;
