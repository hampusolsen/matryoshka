// Capitalizes first letter of a string
export function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

// Converts the universal timestamp provided from dropbox API to readable format
export function convertTimestamp(modified) {
    const splitDate = modified.split('T');
    splitDate[1] = splitDate[1].replace('Z', '');
    const [date, time] = splitDate;

    return compareDateStrings(date) || `${date} ${time}`;
}

// Compares modified date to current date and returns a display value or null
function compareDateStrings(modified, current = currentDate) {
    const modifiedSplit = modified.split('-');
    const currentSplit = current.split('-');

    for (let i = 0; i < 3; i++) {
        if (i === 2) {
            const difference = currentSplit[i] - modifiedSplit[i];

            if (!difference) return 'Today';
            if (difference === 1) return 'Yesterday';
            if (difference < 7) return `${difference} days ago`;
            if (difference < 10) return 'A week ago';
        }

        if (modifiedSplit[i] !== currentSplit[i]) return null;
    }
}

const currentDate = new Date().toLocaleDateString('sv-SE');

// Compare functions
function compareNone() {
    return 0;
}

function compareModifiedAscending(a, b) {
    if (!a.client_modified || !b.client_modified) return 1;
    return b.client_modified.localeCompare(a.client_modified);
}

function compareModifiedDescending(a, b) {
    if (!a.client_modified || !b.client_modified) return 1;
    return a.client_modified.localeCompare(b.client_modified);
}

function compareNameAscending(a, b) {
    return a.name.localeCompare(b.name);
}

function compareNameDescending(a, b) {
    return b.name.localeCompare(a.name);
}

function compareSizeAscending(a, b) {
    return a.size - b.size;
}

function compareSizeDescending(a, b) {
    return b.size - a.size;
}

function compareTypeAscending(a, b) {
    return a.type.localeCompare(b.type);
}

function compareTypeDescending(a, b) {
    return b.type.localeCompare(a.type);
}

// Cases for getCompareFunction switch
const SIZE = 'size';
const NAME = 'name';
const MODIFIED = 'modified';
const TYPE = 'type';

// Gets selected type and order to sort by and returns corresponding compare function
export function getCompareFunction(sortingOptions) {
    switch (sortingOptions.type) {
        case NAME:
            return sortingOptions.order === 'ascending'
                ? compareNameAscending
                : compareNameDescending;
        case MODIFIED:
            return sortingOptions.order === 'ascending'
                ? compareModifiedAscending
                : compareModifiedDescending;
        case SIZE:
            return sortingOptions.order === 'ascending'
                ? compareSizeAscending
                : compareSizeDescending;
        case TYPE:
            return sortingOptions.order === 'ascending'
                ? compareTypeAscending
                : compareTypeDescending;
        default:
            return compareNone;
    }
}

// Splits the 25 first entries in filesContinued
export function splitEntries(filesContinued) {
    if (filesContinued.length <= 25) {
        const files = {
            entries: filesContinued.splice(0, 25),
            has_more: filesContinued.length ? true : false,
        }

        return [files, filesContinued];
    }

    return [filesContinued, []];
}