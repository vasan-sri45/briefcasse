// api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4500/api", // backend prefix இருந்தா இதை use பண்ணு
  withCredentials: true,
  timeout: 60000,
});

// request interceptor – token சேர்க்க
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("bc_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// response interceptor (already irukku)
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);


