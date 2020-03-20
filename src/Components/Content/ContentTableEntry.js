import React from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { setChecked } from '../../utils/SystemActions';

// Helpers
import { convertTimestamp, capitalizeFirstLetter } from './helpers';

// Icons
import FileIcon from '../FileIcon/FileIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ReactComponent as CheckboxEmpty } from '../../assets/checkbox-empty.svg';
import { ReactComponent as CheckboxFilled } from '../../assets/checkbox-filled.svg';

const ContentEntry = ({ entry }) => {
    const setGlobalState = useDispatch();

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
            <td className="content-table__cell content-table__cell--media">
                <div>
                    <FileIcon name={entry.name} tag={entry['.tag']} />
                    {entry['.tag'] === 'folder'
                        ? entry.name
                        : <a href={entry.link} download>{entry.name}</a>}
                </div>
            </td>
            <td className="content-table__cell content-table__cell--modified">
                {entry.client_modified
                    ? convertTimestamp(entry.client_modified)
                    : "--"}
            </td>
            <td className="content-table__cell content-table__cell--size">
                {entry.size ? entry.size : '--'}
            </td>
            <td className="content-table__cell content-table__cell--type">
                {capitalizeFirstLetter(entry.type)}
            </td>
            <td className="content-table__cell content-table__cell--menu">
                <MoreVertIcon />
            </td>
        </tr>
    )
}

export default ContentEntry;
