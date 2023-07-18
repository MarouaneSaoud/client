import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
async function allDevice() {
    return await http.get("/device/");
}
async function addDevice(values) {
    return await http.post("/device/add",values,getAuthHeaders);
}
const DeviceService = {allDevice,addDevice};
export default DeviceService;