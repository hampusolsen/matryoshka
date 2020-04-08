import React from 'react';

// Icons
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

const ContentTableEntryFavorite = ({ entry, onChange }) => {;
    return (
        <div className="content-table__favorite">
            <input
                type='checkbox'
                checked={entry.starred}
                onChange={onChange} />
            <StarBorderRoundedIcon />
            <StarRoundedIcon />
        </div>
    )
}

export default ContentTableEntryFavorite;
