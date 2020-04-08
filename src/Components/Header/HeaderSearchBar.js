import React, { useReducer } from 'react';
import { Redirect } from 'react-router-dom';

// Actions & Reducer
import { reducer, initialState, reset, setQuery, setFocus } from './reducer';

// API Calls & Helpers
import { useDebounce } from '../../utils/helpers';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

const HeaderSearchbar = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const query = useDebounce(state.query, 200);

    return (
        <>
            {(state.focus && query) && <Redirect to={`/?q=${query}`} />}
            {(state.focus && !query) && <Redirect to='/?q=' />}
            {(!state.focus && !query) && <Redirect to='/' />}
            <form 
                onSubmit={e => e.preventDefault()}
                className="header__searchbar">
                <input 
                    type="text"
                    id="query-input"
                    value={state.query}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                    onFocus={() => dispatch(setFocus(true))}
                    onBlur={() => dispatch(setFocus(false))}
                    placeholder="Search your Dropbox"
                    required />
                <label htmlFor="query-input">
                    <SearchIcon />
                </label>
                <button
                    type='button' 
                    onClick={() => dispatch(reset())}>
                    <CancelIcon />
                </button>
            </form>
        </>
    );
}

export default HeaderSearchbar;
