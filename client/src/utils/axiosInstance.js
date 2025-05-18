import axios from "axios";

const instance = axios.create({
    baseURL: `https://blog-app-ispb.onrender.com`,
    withCredentials: true,
});

export default instance;