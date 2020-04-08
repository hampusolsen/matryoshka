import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// Helpers
import { createBreadcrumbs } from './helpers';

const HeaderBreadcrumbs = () => {
    const location = useLocation();
    const breadcrumbs = createBreadcrumbs(location);

    return (
        <div className='header__breadcrumbs'>
            {breadcrumbs.map(({title, pathname, state}) => (
                <React.Fragment key={pathname}>
                    <Link to={{ pathname, state }}>{title}</Link>
                    <span> / </span>
                </React.Fragment>
            ))}
        </div>
    )
}

export default HeaderBreadcrumbs;
