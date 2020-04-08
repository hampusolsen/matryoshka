import React from 'react';
import { restoreEntry } from '../../utils/api';
import { useDispatch } from 'react-redux';

import { restoreEntries } from '../../utils/SystemActions';

// Icons
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

const DeletedContent = ({ entries }) => {
    const setGlobalState = useDispatch();

    function restore(entry) {
        console.log(entry);
        restoreEntry(entry.path_lower, entry.rev)
            .then(() => {
                setGlobalState(restoreEntries(entry));
            });
    }

    return (
        <ul className="deleted-content">
            {
                entries.map(entry => (
                    <li key={entry.id}>
                        {entry.name}
                        <button
                            type='button'
                            onClick={() => restore(entry)}>
                            <RestoreFromTrashIcon />
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}

export default DeletedContent;