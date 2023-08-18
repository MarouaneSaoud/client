import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
const headers = getAuthHeaders();
async function allDevice() {
    return await http.get("/device/",{headers});
}
async function addDevice(values) {
    return await http.post("/device/add",values,{headers});
}
async function countDevices(values) {
    return await http.get("/device/count",{headers});
}
async function decommission(imei) {
    return await http.get("/device/decommissionDevice/"+imei,{headers});
}
async function allocateDevice(values) {
    return await http.post("/device/allocateDevice",values,{headers});
}
async function decommissionToClient(imei) {
    return await http.get("/device/decommissionDeviceToClient/"+imei,{headers});
}
async function allocateDeviceToClient(values) {
    return await http.post("/device/allocateDeviceToClient",values,{headers});
}

const DeviceService = {allDevice,addDevice,countDevices,decommission,allocateDevice,decommissionToClient,allocateDeviceToClient};
export default DeviceService;