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
async function addUser(values) {
    return await http.post("/users/register",values,{headers});
}
async function addUserByRole(values) {
    return await http.post("/users/addRoleToUser",values,{headers});
}
async function allUsers() {
    return await http.get("/users/",{headers});
}
async function allUsersByrole() {
    return await http.get("/users/findAdminUsers",{headers});
}

const AuthService = {login , loadUserByUsername,addUser,addUserByRole,allUsers,allUsersByrole};
export default AuthService;