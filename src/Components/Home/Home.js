import React, { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { setLoggedIn, setUser } from "../../utils/SystemActions";

// Components
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";

// API Functions and Helpers
import { fetchUserInformation } from "../../utils/api";

// Local Helper Functions
import { authenticateUser } from "./helpers";

// File Component
const Home = () => {
    const { hash } = useLocation();
    const setGlobalState = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);

    useEffect(
        () => {
            if (authenticateUser(hash)) setGlobalState(setLoggedIn(true));
            else setGlobalState(setLoggedIn(false));

            fetchUserInformation().then((profile) => {
                setGlobalState(setUser(profile));
            });
        },
        [hash, setGlobalState]
    );

    return (
        <>
            {loggedIn === false && <Redirect to="/login" />}
            {loggedIn && <Redirect to="/" />}
            <div className="home">
                <Sidebar />
                <Header />
                <Content />
                <Footer />
            </div>
        </>
    );
};

export default Home;
