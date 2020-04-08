// Libraries
import React from 'react';
import { useSelector } from 'react-redux';

// Components
import ContentTable from '../Content/ContentTable';
import FavoritesEmpty from './FavoritesEmpty';

const Favorites = () => {
    const entries = useSelector(state => state.favorites);

    return (
        entries.length
            ? <ContentTable entries={entries} has_more={false} />
            : <FavoritesEmpty />
    );
}

export default Favorites;