import axios from "axios";
import axiosRetry from "axios-retry";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const performLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
};

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newAccessToken: string) => {
  refreshSubscribers.forEach((cb) => cb(newAccessToken));
  refreshSubscribers = [];
};

export const apiClient = axios.create({
  baseURL: "https://api.witomark.com/",
  timeout: 120000,
  withCredentials: true
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

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.data?.code === "token_not_valid" && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refresh");
          const response = await axios.post("https://api.witomark.com/api/auth/refresh/", { refresh: refreshToken });
          console.log(response.data);

          const { access } = response.data;
          localStorage.setItem("access", access);

          onRefreshed(access);
          isRefreshing = false;

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest); // Retry original request
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          isRefreshing = false;

          if (refreshError.response?.data?.code === "token_not_valid") {
            console.log("Refresh token is also invalid, logging out user");
            performLogout();
          } else {
            performLogout();
          }

          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);
