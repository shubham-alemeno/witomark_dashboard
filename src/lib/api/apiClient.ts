import axios from "axios";
import axiosRetry from "axios-retry";

export const apiClient = axios.create({
    baseURL: "https://staging-api.witomark.com/",
    timeout: 120000,
    withCredentials: true,
});

axiosRetry(apiClient, { retries: 3 });

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
