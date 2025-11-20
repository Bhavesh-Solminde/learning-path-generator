import axios from "axios";
import { AUTH_TOKEN_KEY } from "../constants/storageKeys";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getStoredToken = () => {
  try {
    if (typeof localStorage === "undefined") {
      return null;
    }

    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Failed to read auth token for request", error);
  }

  return null;
};

const normalizeError = (error) => {
  const status = error.response?.status ?? 500;
  const message = error.response?.data?.message || error.message || "Unexpected error";
  return {
    status,
    message,
    data: error.response?.data ?? null,
    original: error,
  };
};

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(normalizeError(error)),
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error)),
);

export default api;
