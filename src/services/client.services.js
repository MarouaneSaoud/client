import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";

const headers = getAuthHeaders();
async function allClient() {
    return await http.get("/client/",{headers});
}
async function addClient(values) {
    return await http.post("/client/save",values,{headers});
}

const ClientService = {allClient,addClient};
export default ClientService;