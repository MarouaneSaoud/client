import http from "./http.common";

async function login(values) {
    return await http.post("/login", values , { withCredentials: true });
}
