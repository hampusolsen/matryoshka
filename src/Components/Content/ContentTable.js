// Libraries
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { checkAllEntries } from '../../utils/SystemActions';

// Components
import ContentMoreFiles from './ContentMoreFiles';
import ContentTableEntry from './ContentTableEntry';
import ContentTableSortMenu from './ContentTableSortMenu';

// Icons
import { ReactComponent as CheckboxAllFilled } from '../../assets/checkbox-all-filled.svg';
import { ReactComponent as CheckboxAllEmpty } from '../../assets/checkbox-all-empty.svg';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import TextRotateUpIcon from '@material-ui/icons/TextRotateUp';

// Helpers
import { getCompareFunction } from './helpers';

const ContentTable = () => {
    const setGlobalState = useDispatch();
    const [sortingOptions, setSortingOptions] = useState({ type: '', order: '' });
    const { type, order } = sortingOptions;
    const files = useSelector(state => state.files);
    const { entries, has_more } = files;

    function sort({ type, order }) {
        if (type === sortingOptions.type && order === sortingOptions.order) {
            setSortingOptions({ type: '', order: '' });
        }
        else setSortingOptions({ type, order });
    }

    return (
        <>
            <table className='content-table'>
                <thead className='content-table__thead'>
                    <tr className='content-table__row'>
                        <th className='content-table__cell content-table__cell--checkbox'>
                            <div className="content-table__icon--checkbox-all">
                                <input
                                    type='checkbox'
                                    onChange={(e) => setGlobalState(checkAllEntries(e.target.checked))} />
                                <CheckboxAllEmpty />
                                <CheckboxAllFilled />
                            </div>
                        </th>
                        <th className='content-table__cell content-table__cell--media'>
                            <div>
                                Name
                                {!(type === 'name') &&
                                    <SwapVertIcon />}
                                {(type === 'name' && order === 'descending') &&
                                    <TextRotateUpIcon />}
                                {(type === 'name' && order === 'ascending') &&
                                    <TextRotateUpIcon style={{ transform: 'rotate(180deg)' }} />}
                                <ContentTableSortMenu
                                    type={'name'}
                                    setSortingOptions={sort} />
                            </div>
                        </th>
                        <th className='content-table__cell content-table__cell--modified'>
                            <div>
                                Modified
                                {!(type === 'modified') &&
                                    <SwapVertIcon />}
                                {(type === 'modified' && order === 'descending') &&
                                    <TextRotateUpIcon />}
                                {(type === 'modified' && order === 'ascending') &&
                                    <TextRotateUpIcon style={{ transform: 'rotate(180deg)' }} />}
                                <ContentTableSortMenu
                                    type={'modified'}
                                    setSortingOptions={sort} />
                            </div>
                        </th>
                        <th className='content-table__cell content-table__cell--size'>
                            <div>
                                Size
                                {!(type === 'size') &&
                                    <SwapVertIcon />}
                                {(type === 'size' && order === 'descending') &&
                                    <TextRotateUpIcon />}
                                {(type === 'size' && order === 'ascending') &&
                                    <TextRotateUpIcon style={{ transform: 'rotate(180deg)' }} />}
                                <ContentTableSortMenu
                                    type={'size'}
                                    setSortingOptions={sort} />
                            </div>
                        </th>
                        <th className='content-table__cell content-table__cell--type'>
                            <div>
                                Type
                                {!(type === 'type') &&
                                    <SwapVertIcon />}
                                {(type === 'type' && order === 'descending') &&
                                    <TextRotateUpIcon />}
                                {(type === 'type' && order === 'ascending') &&
                                    <TextRotateUpIcon style={{ transform: 'rotate(180deg)' }} />}
                                <ContentTableSortMenu
                                    type={'type'}
                                    setSortingOptions={sort} />
                            </div>
                        </th>
                        <th className='content-table__cell content-table__cell--menu'>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {entries
                        .sort(getCompareFunction({ type, order }))
                        .map(entry => (
                            <ContentTableEntry key={entry.id} entry={entry} />
                        ))}
                </tbody>
            </table>
            {has_more && <ContentMoreFiles />}
        </>
    );
}

export default ContentTable;