import React from "react";
import HeaderBreadcrumbs from "./HeaderBreadcrumbs";
import HeaderSearchBar from "./HeaderSearchBar";

const Header = () => {
    return (
        <header className="header">
            <div className="header__content">
                <HeaderBreadcrumbs />
                <HeaderSearchBar />
            </div>
        </header>
    );
};

export default Header;
