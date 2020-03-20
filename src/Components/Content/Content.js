import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { setFiles } from "../../utils/SystemActions";

// Components
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import ContentTable from "./ContentTable";
import Error from '../Error/Error';

// API Functions and Helpers
import { splitEntries } from "./helpers";
import { fetchFilesAndFolder, addThumbnailsAndURIs } from "../../utils/api";

const Content = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const loggedIn = useSelector(state => state.loggedIn);
    const setGlobalState = useDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        if (!loggedIn) return;

        fetchFilesAndFolder(pathname)
            .then(({ entries, cursor }) => {
                const [files, filesContinued] = splitEntries(entries);

                return addThumbnailsAndURIs(files, filesContinued);
            })
            .then(({ files, filesContinued }) => {
                setGlobalState(setFiles({
                    files,
                    filesContinued
                }));

                setIsLoading(false);
            })
            .catch(() => setError(true));
    }, [loggedIn, pathname, setGlobalState])

    return (
        <main className="content">
            {isLoading && !error
                ? <LoadingAnimation />
                : <ContentTable />}
            {error && <Error />}
        </main>
    );
};

export default Content;
