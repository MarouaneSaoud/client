import http from "./http.common.js";

import getAuthHeaders from "./auth/auth.header";
const headers = getAuthHeaders();
async function getStatistics() {
    return await http.get("/statistics/statisticAdmin",{headers});
}
async function getDeviceStatistic() {
    return await http.get("/statistics/statisticDevices",{headers});
}

const Statistics = {getStatistics,getDeviceStatistic}
export default Statistics;