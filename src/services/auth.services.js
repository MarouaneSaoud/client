import http from "./http.common.js";
import axios from "axios";

async function login(values) {
    return await axios.post("http://localhost:8080/login", values , { withCredentials: true   , headers:{ "Content-Type": "multipart/form-data"}} );
}


const AuthService = {login};
export default AuthService;