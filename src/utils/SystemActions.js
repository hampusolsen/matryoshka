export const CHECK_ALL = 'CHECK_ALL';
export const SET_CHECKED = 'SET_CHECKED';
export const SET_DELETED = 'SET_DELETED';
export const SET_FILES = 'SET_FILES';
export const SET_FAVORITES = 'SET_FAVORITES';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_USER = 'SET_USER';

export const checkAllEntries = checked => ({
    type: CHECK_ALL,
    payload: checked
})

export const setChecked = file => ({
    type: SET_CHECKED,
    payload: { ...file, checked: !file.checked }
})

export const setDeleted = file => ({
    type: SET_DELETED,
    payload: file
})

export const setFiles = ({ files, filesContinued }) => ({
    type: SET_FILES,
    payload: { files, filesContinued }
})

export const setFavorites = file => ({
    type: SET_FAVORITES,
    payload: file
})

export const setLoggedIn = status => ({
    type: SET_LOGGED_IN,
    payload: status
})

export const setUser = user => ({
    type: SET_USER,
    payload: user
})