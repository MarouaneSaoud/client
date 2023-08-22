import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
const headers = getAuthHeaders();

async function addDeviceGroup(values) {
    return await http.post("/deviceGroup/add",values,{headers});
}

async function deleteGroup(id) {
    console.log("trr")
    return await http.delete("/deviceGroup/delete/"+id,{headers});
}


const GroupeService = {addDeviceGroup,deleteGroup};
export default GroupeService;