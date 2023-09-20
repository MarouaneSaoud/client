import axios from "axios";

const http =axios.create({
    baseURL: "http://154.144.247.110:8080",
    headers: {
        "Content-Type": "application/json",
    },

});

export default http;
