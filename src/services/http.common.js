import axios from "axios";
import getAuthHeaders from "@/services/auth/auth.header.js";

const http =axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },

});

export default http;
