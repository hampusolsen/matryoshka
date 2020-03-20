import { Dropbox } from "dropbox";
import { getEntryType } from "../Components/FileIcon/helpers";

export const dbx = new Dropbox({
    fetch,
    clientId: "bqyc5jd5orqeruq"
});

// Retrieves all entries for a specific folder path
export async function fetchFilesAndFolder(path) {
    path = path === "/" ? "" : path;
    const { entries, cursor } = await dbx.filesListFolder({ path });

    return { entries, cursor };
}

/* Starts the process of fetching and adding thumbnail 
and download link properties to files */
export async function addThumbnailsAndURIs({ entries, has_more }, filesContinued) {
    const folders = entries
        .filter(entry => entry['.tag'] === 'folder')
        .map(entry => ({ ...entry, checked: false }));
    const files = entries
        .filter(entry => entry['.tag'] === 'file');

    const [links, thumbnails] = await Promise.all([
        fetchURIs(files),
        fetchThumbnails(files)
    ]);

    const [zippedFolders, zippedFiles] = zipEntryProperties(folders, files, links, thumbnails);

    return {
        files: {
            entries: [...zippedFolders, ...zippedFiles],
            has_more
        },
        filesContinued
    };
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
        spaceAllocated: allocation.allocated
    };
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
            path: entry.path_lower
        }))
    );

    return uris;
}

// Zips thumbnail, link and type properties to files and type property to folders
function zipEntryProperties(folders, files, links, thumbnails) {
    return [
        folders.map(entry => ({ ...entry, type: 'folder' })),
        files.map((entry, idx) => {
            const { thumbnail } = thumbnails[idx];
            const { link } = links[idx];

            return {
                ...entry,
                thumbnail,
                link,
                checked: false,
                type: getEntryType(entry.name, entry['.tag'])
            };
        })
    ];
}