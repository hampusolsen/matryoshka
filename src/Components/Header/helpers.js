// Creates an array of the breadcrumb trail objects 
export function createBreadcrumbs({pathname, state = { path_display: '/' } }) {
    const pathnames = pathname.split('/');
    const displays = state.path_display.split('/');

    const breadcrumbs = !pathnames[1] || pathnames[1] === 'favorites' || pathnames[1] === 'deleted'
        ? [{ title: 'MATRYOSHKA', pathname: '/', state }] 
        : pathnames.map((entry, mapIdx) => {
            const title = !entry ? 'MATRYOSHKA' : displays[mapIdx];
            const pathname = pathnames.reduce(reducer(mapIdx), '');
            const path_display = displays.reduce(reducer(mapIdx), '');
            state.path_display = path_display;
            return { title, pathname, state };
        });
    
    return breadcrumbs;
}

// Reducer function for .reduce() in createBreadCrumbs()
function reducer(mapIdx) {
    return (acc, cur, reduceIdx) => {
        if (reduceIdx > mapIdx) return acc;
        if (reduceIdx === mapIdx) return acc.replace('/', '') + '/' + cur;
        return acc + '/' + cur;
    }
}