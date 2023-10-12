import axios from "axios";

const http =axios.create({
    baseURL: "http://38.242.222.233:8080",
    headers: {
        "Content-Type": "application/json",
    },

});

export default http;
