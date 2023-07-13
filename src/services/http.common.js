import axios from "axios";
import authHeader from "@/services/auth/auth.header.js";
import getAuthHeaders from "@/services/auth/auth.header.js";

const http =axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "multipart/form-data",
    },

});

export default http;
