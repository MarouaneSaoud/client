import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
async function allReference() {
    return await http.get("/reference/",getAuthHeaders);
}
async function addReference(value) {
    return await http.post("/reference/add",value,getAuthHeaders);
}
const ReferenceService = {allReference,addReference};
export default ReferenceService;