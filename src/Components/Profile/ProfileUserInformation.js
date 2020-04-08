import React from 'react';

// Icons
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

// Helpers
import { convertFileSizeToReadable } from '../../utils/helpers';

const ProfileUserInformation = ({user}) => {
    const spaceUsedInPercent = Math.round((user.spaceUsed / user.spaceAllocated) * 100);

    return (
        <div className='profile__user-information'>
            <div className="profile__user-information--name">
                <div className="icon">
                    <AccountBoxIcon />
                </div>
                <div className="text">
                    {user.name.display_name}
                </div>
            </div>
            <div className="profile__user-information--email">
                <EmailIcon />
                {user.email}
            </div>
            <div className="profile__user-information--space-usage">
                <span>{convertFileSizeToReadable(user.spaceUsed)}</span>
                <span>{convertFileSizeToReadable(user.spaceAllocated)}</span>
            </div>
            <div className="profile__user-information--space-allocated">
                <div
                    className="profile__user-information--space-used"
                    style={{ width: `${spaceUsedInPercent}%` }} />
            </div>
        </div>
    )
}

export default ProfileUserInformation;
