export const CHECK_ALL = 'CHECK_ALL';
export const CREATE_FOLDER = 'CREATE_FOLDER';
export const DELETE_ENTRIES = 'DELETE_ENTRIES';
export const FAVORITE_ALL = 'SET_FAVORITES';
export const RESTORE_ENTRY = 'RESTORE_ENTRY';
export const SET_CHECKED = 'SET_CHECKED';
export const SET_FAVORITE = 'SET_FAVORITE';
export const SET_FILES = 'SET_FILES';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_QUERIED = 'SET_QUERIED';
export const SET_USER = 'SET_USER';

export const checkAllEntries = checked => ({
    type: CHECK_ALL,
    payload: checked,
})

export const createNewFolder = folder => ({
    type: CREATE_FOLDER,
    payload: folder,
})

export const deleteEntries = entries => ({
    type: DELETE_ENTRIES,
    payload: entries,
})

export const restoreEntries = entry => ({
    type: RESTORE_ENTRY,
    payload: entry,
})

export const setChecked = file => ({
    type: SET_CHECKED,
    payload: { ...file, checked: !file.checked },
})

export const setFavorite = file => ({
    type: SET_FAVORITE,
    payload: file,
})

export const setFiles = ({ files, filesContinued, createNew }) => ({
    type: SET_FILES,
    payload: { files, filesContinued, createNew },
})

export const setLoggedIn = status => ({
    type: SET_LOGGED_IN,
    payload: status,
})

export const setQueried = entries => ({
    type: SET_QUERIED,
    payload: entries,
})

export const setUser = user => ({
    type: SET_USER,
    payload: user,
})