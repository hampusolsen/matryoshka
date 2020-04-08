import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { setChecked, setFavorite } from '../../utils/SystemActions';

// Components
import ContentTableEntryFavorite from './ContentTableEntryFavorite';
import ContentTableEntryMenu from './ContentTableEntryMenu';

// Helpers
import { convertTimestamp, capitalizeFirstLetter } from './helpers';
import { convertFileSizeToReadable } from '../../utils/helpers';

// Icons
import FileIcon from '../FileIcon/FileIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ReactComponent as CheckboxEmpty } from '../../assets/checkbox-empty.svg';
import { ReactComponent as CheckboxFilled } from '../../assets/checkbox-filled.svg';

// Styles
import { divFocusStyle, SVGFocusStyle } from './styles';

const initialMenu = { open: false, x: 0, y: 0 };

const ContentEntry = ({ entry }) => {
    const setGlobalState = useDispatch();
    const [ menu, setMenu ] = useState(initialMenu);

    const divStyle = menu.open ? divFocusStyle : {};
    const SVGStyle = menu.open ? SVGFocusStyle : {};

    function openMenu(e) {
        const positions = e.target.getBoundingClientRect();
        const x = positions.x - (positions.width / 2);
        const y = positions.y - (positions.height / 2);
        const open = !menu.open;

        setMenu({ open, x, y });
    };

    function closeMenu() {
        setMenu(initialMenu);
    }

    return (
        <tr className="content-table__row">
            <td className="content-table__cell content-table__cell--checkbox">
                <div className="content-table__icon--checkbox-all">
                    <input
                        type="checkbox"
                        checked={entry.checked}
                        onChange={() => setGlobalState(setChecked(entry))} />
                    <CheckboxEmpty />
                    <CheckboxFilled />
                </div>
            </td>
            <td className="content-table__cell content-table__cell--name">
                <div>
                    <FileIcon name={entry.name} tag={entry['.tag']} />
                    {entry['.tag'] === 'folder'
                        ?   <Link to={{
                            pathname: entry.path_lower,
                            state: { path_display: entry.path_display } }}>
                                {entry.name}
                            </Link>
                        :   <a href={entry.link} download>{entry.name}</a>}
                    <ContentTableEntryFavorite 
                        entry={entry} 
                        onChange={() => setGlobalState(setFavorite(entry))} />
                </div>
            </td>
            <td className="content-table__cell content-table__cell--modified">
                {entry.client_modified
                    ? convertTimestamp(entry.client_modified)
                    : "--"}
            </td>
            <td className="content-table__cell content-table__cell--size">
                {entry.size ? convertFileSizeToReadable(entry.size) : '--'}
            </td>
            <td className="content-table__cell content-table__cell--type">
                {capitalizeFirstLetter(entry.type === 'default' ? 'File' : entry.type)}
            </td>
            <td className="content-table__cell content-table__cell--menu">
                <div 
                    className="icon" 
                    style={divStyle}
                    onClick={openMenu} >
                    <MoreVertIcon style={SVGStyle} />
                </div>
                {menu.open && <ContentTableEntryMenu 
                    entry={entry} 
                    close={closeMenu}
                    y={menu.y} />}
            </td>
        </tr>
    )
}

export default ContentEntry;
