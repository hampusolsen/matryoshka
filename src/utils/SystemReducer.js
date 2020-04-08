import {
    CHECK_ALL,
    DELETE_ENTRIES,
    RESTORE_ENTRY,
    SET_CHECKED,
    SET_FAVORITE,
    SET_FILES,
    SET_LOGGED_IN,
    SET_USER,
    SET_QUERIED,
    CREATE_FOLDER,
} from "./SystemActions";

const favorites = localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites'))
    : [];

// Initial System State
export const initialState = {
    favorites,
    files: {
        entries: [],
        has_more: false,
    },
    filesContinued: {
        entries: [],
        cursor: '',
    },
    filesDeleted: [],
    user: {},
    loggedIn: null,
    queried: [],
};

// Global Reducer Function
export function SystemReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHECK_ALL:
            {
                const { entries, has_more } = state.files;

                const files = {
                    entries: entries.map(entry => ({ ...entry, checked: payload })),
                    has_more
                };

                return { ...state, files };
            }

        case CREATE_FOLDER:
            {
                const entries = [
                    ...state.files.entries.filter(entry => entry['.tag'] === 'folder').concat(payload),
                    ...state.files.entries.filter(entry => entry['.tag'] === 'file')
                ];

                const files = { ...state.files, entries };

                return { ...state, files};
            }

        case DELETE_ENTRIES:
            {
                const entries = state.files.entries.filter(entry => {
                    const match = payload.find(({id}) => entry.id === id);

                    return match ? false : true;
                });

                const files = { ...state.files, entries };

                payload = payload.filter(entry => entry['.tag'] === 'file');
                const filesDeleted = state.filesDeleted.concat(payload);

                const favorites = state.favorites.filter(entry => {
                    const match = payload.find(({id}) => id === entry.id);

                    return match ? false : true;
                });

                return { ...state, favorites, files, filesDeleted };
            }

        case RESTORE_ENTRY:
            {
                const filesDeleted = state.filesDeleted.filter(({id}) => id !== payload.id);

                return { ...state, filesDeleted };
            }

        case SET_CHECKED:
            {
                const entries = state.files.entries.map(entry => (
                    entry.id === payload.id
                        ? { ...entry, checked: !entry.checked }
                        : entry
                ));

                return { ...state, files: { ...state.files, entries } };
            }

        case SET_FAVORITE:
            {
                const entries = state.files.entries.map(entry => (
                    entry.id === payload.id
                        ? { ...entry, starred: !entry.starred }
                        : entry
                ));

                const favorites = state.favorites.find(({id}) => id === payload.id)
                    ? state.favorites.filter(({id}) => id !== payload.id)
                    : [ ...state.favorites, { ...payload, starred: true } ];

                const files = { ...state.files, entries };

                const queried = state.queried.map(entry => (
                    entry.id === payload.id
                        ? { ...entry, starred: !entry.starred }
                        : entry
                ));

                localStorage.setItem('favorites', JSON.stringify(favorites));

                return { ...state, files, favorites, queried };
            }

        case SET_FILES:
            {
                const { files, filesContinued, createNew } = payload;

                const entries = createNew 
                    ? [
                        ...files.entries.map(entry => {
                            const match = state.favorites.find(({id}) => entry.id === id);
                            return match || entry;
                        }),    
                    ]
                    : [
                        ...state.files.entries,
                        ...files.entries.map(entry => {
                            const match = state.favorites.find(({id}) => entry.id === id);
                            return match || entry;
                        }),
                    ];

                return {
                    ...state,
                    files: {
                        entries,
                        has_more: files.has_more, 
                    },
                    filesContinued: {
                        entries: filesContinued.entries,
                        cursor: filesContinued.cursor,
                    },
                };
            }

        case SET_LOGGED_IN:
            return { ...state, loggedIn: payload };

        case SET_QUERIED:
            {
                const queried = payload.map(entry => {
                    const starred = !state.favorites.every(({id}) => entry.id !== id);
                    
                    return starred ? { ...entry, starred } : entry;
                });

                return { ...state, queried };
            }

        case SET_USER:
            return { ...state, user: payload };

        default:
            return state;
    };
}
