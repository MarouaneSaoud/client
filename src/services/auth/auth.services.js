import http from "../http.common.js";

async function login(values) {
    return await http.post("/login", values , { withCredentials: true });
}

const AuthService = {login};
export default AuthService;