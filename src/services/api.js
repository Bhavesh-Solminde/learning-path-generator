import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const normalizeError = (error) => {
  const status = error.response?.status ?? 500;
  const message =
    error.response?.data?.message || error.message || "Unexpected error";
  return {
    status,
    message,
    data: error.response?.data ?? null,
    original: error,
  };
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(normalizeError(error))
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error))
);

export default api;
