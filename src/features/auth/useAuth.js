import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../services/api";

const TOKEN_KEY = "lp_auth_token";
const LEGACY_TOKEN_KEY = "token";
const USER_KEY = "lp_auth_user";

const storage = {
  getToken: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Failed to read auth token", error);
      return null;
    }
  },
  setToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(LEGACY_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(LEGACY_TOKEN_KEY);
      }
    } catch (error) {
      console.error("Failed to persist auth token", error);
    }
  },
  clearToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(LEGACY_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to clear auth token", error);
    }
  },
  getUser: () => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error("Failed to parse auth user", error);
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },
  setUser: (user) => {
    try {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch (error) {
      console.error("Failed to persist auth user", error);
    }
  },
  clearUser: () => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error("Failed to clear auth user", error);
    }
  },
};

const ensureAuthPayload = (data, fallbackUser) => {
  if (data?.token && data?.user) {
    return { token: data.token, user: data.user };
  }

  return {
    token: data?.token || `mock-token-${Date.now()}`,
    user: data?.user || fallbackUser,
  };
};

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(() => storage.getUser());
  const [token, setToken] = useState(() => storage.getToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    storage.setToken(token);
  }, [token]);

  useEffect(() => {
    storage.setUser(currentUser);
  }, [currentUser]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      const fallbackUser = {
        email,
        name: email?.split("@")[0] || "User",
      };
      const payload = ensureAuthPayload(data, fallbackUser);
      setToken(payload.token);
      setCurrentUser(payload.user);
      return { success: true, user: payload.user };
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userInput) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/register", userInput);
      const fallbackUser = {
        ...userInput,
        id:
          typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : Date.now(),
      };
      const payload = ensureAuthPayload(data, fallbackUser);
      setToken(payload.token);
      setCurrentUser(payload.user);
      return { success: true, user: payload.user };
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserPreferences = useCallback((preferences) => {
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            preferences,
          }
        : prev
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setCurrentUser(null);
    storage.clearToken();
    storage.clearUser();
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      token,
      login,
      register,
      logout,
      updateUserPreferences,
      loading,
      error,
      isAuthenticated: Boolean(token && currentUser),
    }),
    [
      currentUser,
      token,
      login,
      register,
      logout,
      updateUserPreferences,
      loading,
      error,
    ]
  );

  return value;
};

export const authStorage = {
  getToken: () => storage.getToken(),
  setToken: (token) => storage.setToken(token),
  clearToken: () => storage.clearToken(),
};

export default useAuth;
