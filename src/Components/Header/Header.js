import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
    const { pathname } = useLocation();

    return (
        <header className="header">
            matryoshka {pathname}
        </header>
    );
};

export default Header;
