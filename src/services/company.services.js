import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";

const headers = getAuthHeaders();
async function allCompany() {
    return await http.get("/company/",{headers});
}
async function companyById(id) {
    return await http.get("/company/"+id,{headers});
}
async function companyClientById(id) {
    return await http.get("/company/client/"+id,{headers});
}
async function companyDeviceGroupById(id) {
    return await http.get("/company/deviceGroup/"+id,{headers});
}
async function countCompany() {
    return await http.get("/company/count",{headers});
}

async function addCompany(values) {
    return await http.post("/company/save",values,{headers});
}
const CompanyService = {allCompany,addCompany,companyById,companyClientById,companyDeviceGroupById,countCompany};
export default CompanyService;