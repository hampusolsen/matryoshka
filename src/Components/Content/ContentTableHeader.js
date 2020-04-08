import React from 'react';

// Components
import ContentTableSortMenu from './ContentTableSortMenu';

// Icons
import SwapVertIcon from '@material-ui/icons/SwapVert';
import TextRotateUpIcon from '@material-ui/icons/TextRotateUp';
import { capitalizeFirstLetter } from './helpers';

const ContentTableHeader = ({ type, sortingOptions, setSortingOptions }) => {
    function sort({ type, order }) {
        if (type === sortingOptions.type && order === sortingOptions.order) {
            setSortingOptions({ type: '', order: '' });
        }
        else setSortingOptions({ type, order });
    }

    return (
        <th className={`content-table__cell content-table__cell--${type}`}>
            <div>
                {capitalizeFirstLetter(type)}
                {!(type === sortingOptions.type) &&
                    <SwapVertIcon />}
                {(type === sortingOptions.type && sortingOptions.order === 'descending') &&
                    <TextRotateUpIcon />}
                {(type === sortingOptions.type && sortingOptions.order === 'ascending') &&
                    <TextRotateUpIcon style={{ transform: 'rotate(180deg)' }} />}
                <ContentTableSortMenu
                    type={type}
                    setSortingOptions={sort} />
            </div>
        </th>
    )
}

export default ContentTableHeader;
