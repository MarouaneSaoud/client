import http from "./http.common.js";
import axios from "axios";
import getAuthHeaders from "@/services/auth/auth.header.js";
const headers = getAuthHeaders();


async function login(values) {
    return await axios.post("http://localhost:8080/login", values , { withCredentials: true   , headers:{ "Content-Type": "multipart/form-data"}} );
}
async function loadUserByUsername(values) {
    return await http.post("/users/loadUsername", values , {headers} );
}

const AuthService = {login , loadUserByUsername};
export default AuthService;