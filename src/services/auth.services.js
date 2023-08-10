import http from "./http.common.js";
import axios from "axios";
import getAuthHeaders from "@/services/auth/auth.header.js";
const headers = getAuthHeaders();


async function login(values) {
    return await axios.post("http://localhost:8080/login", values , { withCredentials: true   , headers:{ "Content-Type": "multipart/form-data"}} );
}
async function loadUserByUsername(username , token) {

    return await http.get("/users/loadUsername/"+username);
}
async function addUserAdmin(values) {
    return await http.post("/users/register/admin",values,{headers});
}

async function addUserByRole(values) {
    return await http.post("/users/addRoleToUser",values,{headers});
}
async function allUsers() {
    return await http.get("/users/",{headers});
}
async function disableUser(id) {
    return await http.get("/users/disableUser/"+id,{headers});
}

async function unableUser(id) {
    return await http.get("/users/unableUser/"+id,{headers});
}


async function allUsersAdmin() {
    return await http.get("/users/findAdminUsers",{headers});
}

const AuthService = {login , loadUserByUsername,addUserAdmin,allUsersAdmin,disableUser,unableUser};

export default AuthService;