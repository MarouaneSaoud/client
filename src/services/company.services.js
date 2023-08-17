import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";

const headers = getAuthHeaders();
async function allCompany() {
    return await http.get("/company/",{headers});
}
async function companyById(id) {
    return await http.get("/company/"+id,{headers});
}
async function companyClientByEmail(email) {
    return await http.get("/company/client/"+email,{headers});
}
async function companyDeviceGroupByEmail(email) {
    return await http.get("/company/deviceGroup/"+email,{headers});
}
async function companyDeviceByEmail(email) {
    return await http.get("/company/device/"+email,{headers});
}

async function countCompany() {
    return await http.get("/company/count",{headers});
}
async function addCompany(values) {
    return await http.post("/company/save",values,{headers});
}
async function deleteCompany(id) {
    return await http.delete("/company/delete/"+id,{headers});
}

const CompanyService = {allCompany,addCompany,companyById,companyDeviceByEmail,companyClientByEmail,companyDeviceGroupByEmail,countCompany,deleteCompany,};
export default CompanyService;