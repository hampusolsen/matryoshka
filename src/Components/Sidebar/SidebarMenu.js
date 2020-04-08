import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Icons
import FolderSpecialRoundedIcon from '@material-ui/icons/FolderSpecialRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import CreateNewFolderRoundedIcon from '@material-ui/icons/CreateNewFolderRounded';
import InboxRoundedIcon from '@material-ui/icons/InboxRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateFolder from '../CreateFolder/CreateFolder';

const SidebarMenu = () => {
    const [option, setOption] = useState(null);

    return (
        <>
            {option === 1 && <CreateFolder close={() => setOption(null)} />}
            <nav className="sidebar__menu">
                <div className="sidebar__menu-item">
                    <button>
                        <span>Upload files</span>
                        <PublishRoundedIcon />
                    </button>
                </div>
                <div className="sidebar__menu-item">
                    <button>
                        <span>Upload folder</span>
                        <PublishRoundedIcon />
                    </button>
                </div>
                <div className="sidebar__menu-item">
                    <button onClick={() => setOption(1)}>
                        <span>New folder</span>
                        <CreateNewFolderRoundedIcon />
                    </button>
                </div>
                <div className="sidebar__menu-item">
                    <Link to='/favorites'>
                        <span>Favorites</span>
                        <FolderSpecialRoundedIcon />
                    </Link>
                </div>
                <div className="sidebar__menu-item">
                    <button>
                        <span>Request files</span>
                        <InboxRoundedIcon />
                    </button>
                </div>
                <div className="sidebar__menu-item">
                    <Link to='/deleted'>
                        <span>Recently deleted</span>
                        <DeleteIcon />
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default SidebarMenu;
