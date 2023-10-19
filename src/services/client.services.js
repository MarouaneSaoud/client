import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";

const headers = getAuthHeaders();
async function allClient() {
    return await http.get("/client/",{headers});
}
async function addClient(values) {
    return await http.post("/client/save",values,{headers});
}
async function findDevicesByEmail(email) {
    return await http.get("/client/findDevicesByEmail/"+email,{headers});
}

async function deleteClient(id) {
    return await http.delete("/client/delete/"+id,{headers});
}

const ClientService = {allClient,addClient,deleteClient,findDevicesByEmail};
export default ClientService;