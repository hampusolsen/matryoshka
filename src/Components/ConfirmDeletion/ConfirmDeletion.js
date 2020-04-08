// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// API Calls
import { deleteEntry } from '../../utils/api';

// Icons
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { useDispatch } from 'react-redux';
import { deleteEntries } from '../../utils/SystemActions';

const ConfirmDeletion = ({entry, close}) => {
    const setGlobalState = useDispatch();

    function del() {
        deleteEntry(entry.path_lower)
            .then(() => {
                setGlobalState(deleteEntries([entry]));
            });
    }

    return ReactDOM.createPortal(
        <div className="confirm-deletion__modal">
            <div className='confirm-deletion' onClick={e => e.stopPropagation()}>
                <h1 className='confirm-deletion__title'>
                    <WarningRoundedIcon /> 
                    Confirm Deletion
                </h1>
                <div className="confirm-deletion__btn-container">
                    <button className="confirm-deletion__btn--accept" onClick={del}>Confirm</button>
                    <button className="confirm-deletion__btn--cancel" onClick={close}>Cancel</button>
                </div>
                <p className='confirm-deletion__information'>
                    * Once deleted, files can be found in <span>Recently deleted</span><br/>
                    for the duration of this session, from where it can be restored. Not including folders!
                </p>
            </div>
        </div>,
        document.querySelector('body')
    );
}

export default ConfirmDeletion;