import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Actions
import { setQueried } from '../../utils/SystemActions';

// API Calls & Helpers
import { fetchQueried } from '../../utils/api';

// Components
import QueriedEmpty from './QueriedEmpty';
import ContentTable from '../Content/ContentTable';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

const Queried = () => {
    const { search } = useLocation();
    const setGlobalState = useDispatch();
    const entries = useSelector(state => state.queried);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const query = search.split('=')[1];

        if (query) {
            setLoading(true);
            fetchQueried(query)
                .then(({ files }) => {
                    setGlobalState(setQueried(files.entries));
                    setLoading(false);
                });
        } else {
            setGlobalState(setQueried([]));
        };
    }, [search, setGlobalState]);

    return (
        loading 
            ? <LoadingAnimation />
            : entries.length
            ? <ContentTable entries={entries} />
            : <QueriedEmpty />
    )
}

export default Queried;
