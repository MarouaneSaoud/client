import http from "./http.common.js";

import getAuthHeaders from "./auth/auth.header";
const headers = getAuthHeaders();
async function getStatistics() {
    return await http.get("/statistics/statisticAdmin",{headers});
}

const Statistics = {getStatistics}
export default Statistics;