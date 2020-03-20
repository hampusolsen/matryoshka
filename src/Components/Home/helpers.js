import { dbx } from "../../utils/api";

// Checks whether Access Token is found in hash or localStorage
export function authenticateUser(hash) {
    let authenticated = false;
    const localStorageToken = window.localStorage.getItem("token");

    if (hash) {
        if (registerAccessToken(hash)) authenticated = true;
    }
    else if (localStorageToken) {
        if (!dbx.getAccessToken()) dbx.setAccessToken(localStorageToken);
        authenticated = true;
    }

    return authenticated;
}

// Finds Access Token in hash and stores it in localStorage and the dropbox class object;
function registerAccessToken(hash) {
    const regExp = new RegExp(/=.*(?=&t)/, "i");
    const token = hash.match(regExp).shift().replace('=', '');

    if (token) {
        dbx.setAccessToken(token);
        window.localStorage.setItem('token', token);
        return true;
    }

    return false;
}