import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";

const headers = getAuthHeaders();
async function allCompany() {
    return await http.get("/company/",{headers});
}
async function addCompany(values) {
    return await http.post("/company/save",values,{headers});
}
const CompanyService = {allCompany,addCompany};
export default CompanyService;