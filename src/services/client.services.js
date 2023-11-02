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
async function Top5Clients() {
    return await http.get("//",{headers});
}
async function CountClientDevices (email) {
    return await http.get("/client/countClientDevices/"+email,{headers});
}
const ClientService = {allClient,addClient,deleteClient,findDevicesByEmail,CountClientDevices};
export default ClientService;