import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
const headers = getAuthHeaders();

async function addDeviceGroup(values) {
    return await http.post("/deviceGroup/add",values,{headers});
}


const GroupeService = {addDeviceGroup};
export default GroupeService;