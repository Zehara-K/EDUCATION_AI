import API from "./api.js"

export function isLoggedIn() {
    return localStorage.getItem("token");
}