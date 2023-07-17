import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
async function allReference() {
    return await http.get("/reference/",getAuthHeaders);
}
const ReferenceService = {allReference};
export default ReferenceService;