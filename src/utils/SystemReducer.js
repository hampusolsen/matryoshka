import {
    CHECK_ALL,
    SET_CHECKED,
    SET_FILES,
    SET_FAVORITES,
    SET_LOGGED_IN,
    SET_USER,
    SET_DELETED
} from "./SystemActions";

// Initial System State
export const initialState = {
    files: {
        entries: [],
        has_more: false,
    },
    filesContinued: [],
    filesDeleted: [],
    favorites: [],
    user: {},
    loggedIn: null,
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
                }
                return { ...state, files };
            }

        case SET_CHECKED:
            {
                const entries = state.files.entries.map(entry => (
                    entry.id === payload.id
                        ? {
                            ...entry,
                            checked: !entry.checked,
                        }
                        : entry
                ));

                return { ...state, files: { ...state.files, entries } };
            }

        case SET_DELETED:
            return { ...state, filesDeleted: [...state.filesDeleted, payload] };

        case SET_FILES:
            const { files, filesContinued } = payload;

            return { ...state, files, filesContinued };

        case SET_FAVORITES:
            return { ...state };

        case SET_LOGGED_IN:
            return { ...state, loggedIn: payload };

        case SET_USER:
            return { ...state, user: payload };

        default:
            return state;
    };
}
