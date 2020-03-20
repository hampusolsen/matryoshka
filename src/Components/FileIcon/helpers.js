const executables = ['exe', 'msi', 'bin', 'com', 'bat'];
const images = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
const compresseds = ['7z', 'rar', 'zip'];
const codes = ['js', 'ts', 'css', 'scss', 'sass', 'tsx', 'html', 'py'];
const documents = ['docx', 'odf', 'xls', 'txt', 'doc'];
const pdfs = ['pdf'];
const fonts = ['ttf', 'otf'];

const extensions = [
    ['executable', executables],
    ['image', images],
    ['compressed', compresseds],
    ['code', codes],
    ['document', documents],
    ['pdf', pdfs],
    ['font', fonts]
]

function createExtensionsLibrary() {
    const fileExtensions = {};

    for (const i of extensions) {
        let type = i[0], exts = i[1];

        for (const ext of exts) {
            fileExtensions[ext] = type;
        }
    }

    return fileExtensions;
}

const fileExtensionsLibrary = createExtensionsLibrary();


function getFileExtension(name) {
    const fileNameSplit = name.split('.');

    return fileNameSplit[fileNameSplit.length - 1];
}



export function getEntryType(name, tag) {
    if (tag === 'folder') return 'folder';

    const fileExtension = getFileExtension(name);

    return fileExtensionsLibrary[fileExtension]
        ? fileExtensionsLibrary[fileExtension]
        : 'default';
}