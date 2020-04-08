// Libraries
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { setFiles } from "../../utils/SystemActions";

// Components
import ContentTable from "./ContentTable";
import Deleted from "../Deleted/Deleted";
import Error from '../Error/Error';
import Favorites from "../Favorites/Favorites";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import Queried from '../Queried/Queried';

// API Calls and Helpers
import { fetchFilesAndFolders, dbx } from "../../utils/api";

const Content = () => {
    const setGlobalState = useDispatch();
    const location = useLocation();
    const { pathname, search } = location;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const loggedIn = useSelector(state => state.loggedIn);
    const {entries, has_more} = useSelector(state => state.files);

    useEffect(() => {
        if (!loggedIn) return;

        if (pathname === '/favorites' || pathname === '/deleted') {
            setIsLoading(false);
            return;
        };

        if (!search) {
            setIsLoading(true);

            if (!dbx.getAccessToken()) return;

            fetchFilesAndFolders(pathname)
                .then(response => {
                    setGlobalState(setFiles(response));

                    setIsLoading(false);
                })
                .catch(() => setError(true));
        };
    }, [loggedIn, pathname, search, setGlobalState]);

    return (
        <main className="content">
            {(isLoading && !error) ? <LoadingAnimation />
                : pathname === '/favorites' ? <Favorites />
                : search ? <Queried />
                : pathname === '/deleted' ? <Deleted />
                : <ContentTable entries={entries} has_more={has_more} />}
            {error && <Error />}
        </main>
    );
};

export default Content;
