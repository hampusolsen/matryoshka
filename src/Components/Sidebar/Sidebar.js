import React from "react";

// Components
import Profile from "../Profile/Profile";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
    return (
    <aside className="sidebar">
        <Profile />
        <SidebarMenu />
    </aside>);
};

export default Sidebar;
