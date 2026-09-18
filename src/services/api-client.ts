import axios, { AxiosInstance } from "axios";
import { getCookie } from "@/lib/cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

export const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => {
    // Unwrap the envelope once, here, so callers get `result` directly
    response.data = response.data?.data ?? response.data;
    return response;
  },
  (error) => {
    const message = error.response?.data?.message ?? "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

// Request interceptor to add JWT token from cookie
client.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
// client.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       // Only redirect to login if we're not already on the login page
//       // This prevents page refresh during login form submission errors
//       if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default client;
