import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
const headers = getAuthHeaders();
async function allReference() {
    return await http.get("/reference/",{headers} );
}
async function addReference(value) {
    return await http.post("/reference/add",value,{headers});
}
const ReferenceService = {allReference,addReference};
export default ReferenceService;