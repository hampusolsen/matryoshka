const RESET = 'RESET';
const SET_FOCUS = 'SET_FOCUS';
const SET_QUERY = 'SET_QUERY';

export const setFocus = focus => ({
    type: SET_FOCUS,
    payload: focus,
})

export const setQuery = query => ({
    type: SET_QUERY,
    payload: query,
})

export const reset = () => ({
    type: RESET,
    payload: null,
})

export const initialState = {
    query: '',
    focus: false,
};

export function reducer(state, { type, payload }) {
    switch (type) {
        case RESET:
            return initialState;
        case SET_FOCUS:
            return { ...state, focus: payload };
        case SET_QUERY:
            return { ...state, query: payload };
        default:
            throw new Error();
    }
}