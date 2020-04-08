import { Dropbox } from "dropbox";
import { getEntryType } from "../Components/FileIcon/helpers";

export const dbx = new Dropbox({
    fetch,
    clientId: "bqyc5jd5orqeruq"
});

let currentPath = '';

/* Starts the process of fetching and adding thumbnail 
and download link properties to files */
export async function addThumbnailsAndURIs(entries, cursor = null, pathname = '') {
    const createNew = pathname || false;

    let [files, filesContinued] = splitEntries(entries);
    const { has_more } = files;
    entries = files.entries;

    const folders = entries
        .filter(entry => entry['.tag'] === 'folder')
        .map(entry => ({ ...entry, checked: false }));
        
    files = entries
        .filter(entry => entry['.tag'] === 'file');
        
    const [links, thumbnails] = await Promise.all([
        fetchURIs(files),
        fetchThumbnails(files)
    ]);

    const [zippedFolders, zippedFiles] = zipEntryProperties(folders, files, links, thumbnails);

    return {
        files: {
            entries: [...zippedFolders, ...zippedFiles],
            has_more,
        },
        filesContinued: {
            entries: filesContinued,
            cursor
        },
        createNew,
    };
}

// Creates new folder
export async function createFolder(path, name) {
    if (!name) return;

    path = path === '/'
        ? path + name
        : path + '/' + name;

    const { metadata } = await dbx.filesCreateFolderV2({ path });

    return { ...metadata, type: 'folder', starred: false, checked: false};
}

// Deletes file or folder
export async function deleteEntry(path) {
    return dbx.filesDeleteV2({ path });
}

// Retrieves all entries for a specific folder path
export async function fetchFilesAndFolders(pathname) {
    currentPath = pathname;
    const path = pathname === "/" ? "" : pathname;
    
    const { entries, cursor } = await dbx.filesListFolder({ path });

    return addThumbnailsAndURIs(entries, cursor, pathname);
}

// Fetches entries that match search query
export async function fetchQueried(query) {
    const path = '';
    const mode = { '.tag': 'filename' }

    const { matches } = await dbx.filesSearch({ path, query, mode });

    const entries = matches.map(entry => entry.metadata);
    
    return addThumbnailsAndURIs(entries);
}

// Fetches thumbnail property for all entries
async function fetchThumbnails(files) {
    const { entries } = await dbx.filesGetThumbnailBatch({
        entries: files
            .map(entry => ({
                path: entry.path_lower,
                size: 'w64h64',
            }))
    })

    return entries;
}

// Fetches download link for all legible entries
async function fetchURIs(entries) {
    const uris = await Promise.all(
        entries.map(entry => dbx.filesGetTemporaryLink({
            path: entry.path_lower,
        }))
    );

    return uris;
}

// Fetches and combines user profile and space usage into one object
export async function fetchUserInformation() {
    const [profile, { used, allocation }] = await Promise.all([
        dbx.usersGetCurrentAccount(),
        dbx.usersGetSpaceUsage()
    ])

    return {
        ...profile,
        spaceUsed: used,
        spaceAllocated: allocation.allocated,
    };
}

// Restores entry from deleted files
export async function restoreEntry(path, rev) {
    return dbx.filesRestore({ path, rev });
}

// Starts recursive polling for the current cursor
export async function runFolderLongpoll(cursor, path) {
    if (path !== currentPath) return;

    const { changes } = await dbx.filesListFolderLongpoll({ cursor, timeout: 30 });

    return changes;
}


// Splits the 25 first entries and returns tuple with files object and filesContinued array
function splitEntries(entries) {
    const has_more = entries.length > 25 ? true : false;

    if (entries.length > 25) {
        const filesContinued = entries.slice(25);
        const files = {
            entries: entries.slice(0, 25),
            has_more
        }

        return [files, filesContinued];
    }

    return [{ entries, has_more }, []];
}

// Zips thumbnail, link and type properties to files and type property to folders
function zipEntryProperties(folders, files, links, thumbnails) {
    return [
        folders.map(entry => ({ ...entry, type: 'folder', checked: false, starred: false })),
        files.map((entry, idx) => {
            const { thumbnail } = thumbnails[idx];
            const { link } = links[idx];
            const type = getEntryType(entry.name, entry['.tag'])

            return {
                ...entry,
                thumbnail,
                link,
                checked: false,
                starred: false,
                type
            };
        })
    ];
}