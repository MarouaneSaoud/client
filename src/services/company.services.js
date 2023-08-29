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
async function deviceGroupWithDeviceCount(email) {
    return await http.get("/company/deviceGroupWithDeviceCount/"+email,{headers});
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
async function infosCompany(email) {
    return await http.get("/company/connected/"+email,{headers});
}
async function percentageAllocatedDevices(email) {
    return await http.get("/company/percentageAllocatedDevices/"+email,{headers});
}
async function companyStatistic(email) {
    return await http.get("/company/companyStatistic/"+email,{headers});
}
async function Top5Company() {
    return await http.get("/company/topcompanies",{headers});
}

const CompanyServices = {Top5Company,allCompany,companyStatistic,percentageAllocatedDevices,addCompany,infosCompany,companyById,deviceGroupWithDeviceCount,companyDeviceByEmail,companyClientByEmail,companyDeviceGroupByEmail,countCompany,deleteCompany,};
export default CompanyServices;