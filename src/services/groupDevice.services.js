import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
const headers = getAuthHeaders();

async function addDeviceGroup(values) {
    return await http.post("/deviceGroup/add",values,{headers});
}
async function deviceFromGroup(id) {
    return await http.get("/deviceGroup/devicesFromGroup/"+id,{headers});
}

async function deleteGroup(id) {
    return await http.delete("/deviceGroup/delete/"+id,{headers});
}


const GroupService = {addDeviceGroup,deleteGroup,deviceFromGroup};
export default GroupService;