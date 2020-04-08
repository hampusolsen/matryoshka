import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { addThumbnailsAndURIs } from '../../utils/api';

import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

const ContentMoreFiles = ({setFiles}) => {
    const { entries, cursor } = useSelector(state => state.filesContinued);
    const [loading, setLoading] = useState(false);

    function fetchMoreFiles() {
        setLoading(true);
        addThumbnailsAndURIs(entries, cursor)
            .then(response => {
                setFiles(response);
                setLoading(false);
            })
    }

    return (
        <div className="content-table__has-more">
            {!loading
                ? <button
                    className='content-table__more-button'
                    type='button'
                    onClick={fetchMoreFiles}>
                    <span>LOAD MORE</span>
                </button>
                : <LoadingAnimation />}
        </div>
    );
}

export default ContentMoreFiles;