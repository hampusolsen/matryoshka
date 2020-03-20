import React from 'react';

const ContentTableSortMenu = ({ type, setSortingOptions }) => {
    function onClick(order) {
        setSortingOptions({ type, order });
    }
    
    return (
        <ul className='content-table__sort-menu'>
            <li className="content-table__sort-menu__item">
                <button
                    type='button'
                    onClick={() => onClick('ascending')} >
                    Ascending
                </button>
            </li>
            <li className="content-table__sort-menu__item">
                <button
                    type='button'
                    onClick={() => onClick('descending')} >
                    Descending
                </button>
            </li>
        </ul>
    )
}

export default ContentTableSortMenu;
