import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.sk-blackrock-financial.com/api",
    withCredentials: true, 
});

export default axiosInstance;