import axios from "axios";

const API = axios.create({
    baseURL: "https://the-upside-down-portal.onrender.com/api",
});

export default API;