import http from "./http.common.js";
import getAuthHeaders from "./auth/auth.header";
async function allDevice() {
    return await http.get("/device/");
}
const DeviceService = {allDevice};
export default DeviceService;