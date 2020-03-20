// Libraries
import React from 'react';

// Icons
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CodeIcon from '@material-ui/icons/Code';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import ControlCameraOutlinedIcon from '@material-ui/icons/ControlCameraOutlined';
import FontDownloadOutlinedIcon from '@material-ui/icons/FontDownloadOutlined';

// Local Helper Functions
import { getEntryType } from './helpers';

const FileIcon = ({ name, tag }) => {

    const type = getEntryType(name, tag);

    return (
        <div className="content-table__icon">
            {type === 'folder' && <FolderOutlinedIcon />}
            {type === 'default' && <InsertDriveFileOutlinedIcon />}
            {type === 'executable' && <SettingsOutlinedIcon />}
            {type === 'code' && <CodeIcon />}
            {type === 'image' && <ImageOutlinedIcon />}
            {type === 'font' && <FontDownloadOutlinedIcon />}
            {type === 'compressed' && <ControlCameraOutlinedIcon />}
            {type === 'document' && <DescriptionOutlinedIcon />}
            {type === 'pdf' && <PictureAsPdfOutlinedIcon />}
        </div>
    )
}

export default FileIcon;
