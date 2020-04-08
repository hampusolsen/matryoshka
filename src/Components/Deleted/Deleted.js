import React from 'react';
import { useSelector } from 'react-redux';

// Components
import DeletedEmpty from './DeletedEmpty';
import DeletedContent from './DeletedContent';

const Deleted = () => {
    const entries = useSelector(state => state.filesDeleted);

    return (
        entries.length
            ? <DeletedContent entries={entries} />
            : <DeletedEmpty />
    )
}

export default Deleted;
