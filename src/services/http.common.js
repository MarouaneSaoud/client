import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/",
    Headers: { "Content-type": "application/json" },
});
