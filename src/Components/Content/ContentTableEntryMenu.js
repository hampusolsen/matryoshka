import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';

// Actions
import { setFavorite } from '../../utils/SystemActions';

// Components
import ConfirmDeletion from '../ConfirmDeletion/ConfirmDeletion';

const ContentTableEntryMenu = ({entry, close, y}) => {
    const setGlobalState = useDispatch()
    const [ style, setStyle ] = useState({ opacity: 0 });
    const [ confirmDeletion, setConfirmDeletion ] = useState(false);
    const listRef = useRef(null);

    useEffect(() => {
        const content = document.querySelector('.content');
        window.addEventListener('click', close);
        content.addEventListener('scroll', close);

        const bounds = listRef.current.getBoundingClientRect();
        const my = window.innerHeight;
        const margin = 36;
        
        const top = (y + bounds.height) > my - 30
            ? y - bounds.height + margin
            : y + margin;

        setStyle({ top });

        return () => {
            window.removeEventListener('click', close);
            content.removeEventListener('scroll', close);
        };
    }, [close, y]);

    function copy() {
        close();
    }

    function delEntry() {
        setConfirmDeletion(true);
    }

    function download() {
        close();
    }

    function favorite() {
        setGlobalState(setFavorite(entry));
        close();
    }

    function move() {
        close();
    }

    function rename() {
        close();
    }

    return ReactDOM.createPortal(
        <>
            {
                confirmDeletion && 
                    <ConfirmDeletion 
                        entry={entry} 
                        close={close} />
            }
            <ul 
                className='content-table__entry-menu'
                ref={listRef}
                onClick={(e) => e.stopPropagation()}
                style={confirmDeletion ? { visibility: 'hidden' } : style} >
                <li>
                    {
                        entry['.tag'] === 'file'
                            ? <a 
                                href={entry.link}
                                onClick={close}
                                download >
                                Download</a>
                            : <button onClick={download}>Download</button>
                    }
                </li>
                <li>
                    <button onClick={favorite}>Favorite</button>
                </li>
                <li>
                    <button onClick={rename}>
                        Rename
                    </button>
                </li>
                <li>
                    <button onClick={move}>
                        Move
                    </button>
                </li>
                <li>
                    <button onClick={copy}>
                        Copy
                    </button>
                </li>
                <li>
                    <button onClick={delEntry}>
                        Delete
                    </button>
                </li>
            </ul>
        </>,
        document.querySelector('body')
    );
}

export default ContentTableEntryMenu;
