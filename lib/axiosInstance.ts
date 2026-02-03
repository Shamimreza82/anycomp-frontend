import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1", // NestJS backend URL
  withCredentials: true, // send cookies automatically
});

// Optional: Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can attach token from localStorage if you use JWT instead of cookie
    // const token = localStorage.getItem("token");
    // if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors like unauthorized (401)
    if (error.response?.status === 401) {
      // redirect to login page or logout user
      console.log("Unauthorized! Please login again.");
    }
    return Promise.reject(error);
  }
);

export default api;
