import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
const headers = getAuthHeaders();
async function allDevice() {
    return await http.get("/device/",{headers});
}
async function addDevice(values) {
    return await http.post("/device/add",values,{headers});
}
const DeviceService = {allDevice,addDevice};
export default DeviceService;