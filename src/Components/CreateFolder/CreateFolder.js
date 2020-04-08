// React
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// API
import { createFolder } from '../../utils/api';
import { createNewFolder } from '../../utils/SystemActions';

const CreateFolder = ({ close }) => {
    const setGlobalState = useDispatch();
    const { pathname } = useLocation();
    const [name, setName] = useState('');

    useEffect(() => {
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
    }, [close]);

    function create() {
        createFolder(pathname, name)
            .then(folder => {
                setGlobalState(createNewFolder(folder));
                close();
            });
    };

    return ReactDOM.createPortal(
        <div className="create-folder__bg">
            <div className='create-folder' onClick={e => e.stopPropagation()}>
                <label htmlFor='folder-name-input'>
                    Name:
                    <input 
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </label>
                <div className="create-folder__btn-container">
                    <button
                        className='create-folder__btn--accept'
                        onClick={create} >
                        <span>CREATE</span>
                    </button>
                    <button
                        className='create-folder__btn--cancel'
                        onClick={close} >
                        <span>CANCEL</span>
                    </button>
                </div>
            </div>
        </div>,
        document.querySelector('body')
    );
}

export default CreateFolder;