import axios from "axios";
import { baseURL } from "../api/baseURL";
import { toast } from "react-toastify";

// Create an Axios instance
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Request Interceptor (Attach access token to every request)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.message;

      if (message === "Token expired") {
        toast.error("Session expired! Please log in again."); // Show toast message
        localStorage.removeItem("authToken"); // Remove expired token
      } else {
        toast.error("Unauthorized! Please log in.");
      }
    }

    return Promise.reject(error);
  }
);
export default api;
