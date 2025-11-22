import { BASE_URL } from "@/constant";
import { getLangCode } from "@/helper";
import axios from "axios";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    const token = localStorage.getItem("token") || null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const langCode = getLangCode();
    if (langCode) {
      config.params = {
        ...config.params,
        lang: langCode,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { apiClient };
