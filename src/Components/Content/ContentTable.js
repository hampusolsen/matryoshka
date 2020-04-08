// Libraries
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { checkAllEntries, setFiles } from '../../utils/SystemActions';

// Components
import ContentMoreFiles from './ContentMoreFiles';
import ContentTableEntry from './ContentTableEntry';

// Icons
import { ReactComponent as CheckboxAllFilled } from '../../assets/checkbox-all-filled.svg';
import { ReactComponent as CheckboxAllEmpty } from '../../assets/checkbox-all-empty.svg';

// Helpers
import { getCompareFunction } from './helpers';
import ContentTableHeader from './ContentTableHeader';
import { useEffect } from 'react';
import { preventFlashingOnLoad } from '../../utils/animations';

const ContentTable = ({entries, has_more}) => {
    const setGlobalState = useDispatch();
    const [sortingOptions, setSortingOptions] = useState({ type: '', order: '' });

    useEffect(() => {
        preventFlashingOnLoad('.content-table');
    }, [])

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
                        <ContentTableHeader
                            type='name'
                            sortingOptions={sortingOptions}
                            setSortingOptions={setSortingOptions} />
                        <ContentTableHeader
                            type='modified'
                            sortingOptions={sortingOptions}
                            setSortingOptions={setSortingOptions} />
                        <ContentTableHeader
                            type='size'
                            sortingOptions={sortingOptions}
                            setSortingOptions={setSortingOptions} />
                        <ContentTableHeader
                            type='type'
                            sortingOptions={sortingOptions}
                            setSortingOptions={setSortingOptions} />
                        <th className='content-table__cell content-table__cell--menu'>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {entries
                        .sort(getCompareFunction(sortingOptions))
                        .map(entry => (
                            <ContentTableEntry key={entry.id} entry={entry} />
                        ))}
                </tbody>
            </table>
            {has_more && <ContentMoreFiles setFiles={(entries) => setGlobalState(setFiles(entries))}/>}
        </>
    );
}

export default ContentTable;