import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../../constants/storageKeys";

const storage = {
  getToken: () => {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to read auth token", error);
      return null;
    }
  },
  setToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    } catch (error) {
      console.error("Failed to persist auth token", error);
    }
  },
  clearToken: () => {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to clear auth token", error);
    }
  },
  getUser: () => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error("Failed to parse auth user", error);
      localStorage.removeItem(AUTH_USER_KEY);
      return null;
    }
  },
  setUser: (user) => {
    try {
      if (user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    } catch (error) {
      console.error("Failed to persist auth user", error);
    }
  },
  clearUser: () => {
    try {
      localStorage.removeItem(AUTH_USER_KEY);
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

const shouldFallbackToOfflineAuth = (error) => {
  if (!error) {
    return false;
  }

  if (typeof error.status === "number") {
    return [0, 404, 500, 502, 503].includes(error.status);
  }

  if (!error.message) {
    return false;
  }

  const normalized = error.message.toLowerCase();
  return normalized.includes("network") || normalized.includes("failed to fetch");
};

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(() => storage.getUser());
  const [token, setToken] = useState(() => storage.getToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const completeAuth = useCallback((payload, meta = {}) => {
    setToken(payload.token);
    setCurrentUser(payload.user);
    return { success: true, user: payload.user, offline: Boolean(meta.offline) };
  }, []);

  useEffect(() => {
    storage.setToken(token);
  }, [token]);

  useEffect(() => {
    storage.setUser(currentUser);
  }, [currentUser]);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.post("/auth/login", { email, password });
        const fallbackUser = {
          email,
          name: email?.split("@")[0] || "User",
        };
        const payload = ensureAuthPayload(data, fallbackUser);
        return completeAuth(payload);
      } catch (err) {
        if (shouldFallbackToOfflineAuth(err)) {
          console.warn("Auth API unreachable, continuing in offline mode.", err);
          const fallbackPayload = ensureAuthPayload(
            {},
            {
              email,
              name: email?.split("@")[0] || "User",
              role: "Learner",
            },
          );
          return completeAuth(fallbackPayload, { offline: true });
        }
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [completeAuth],
  );

  const register = useCallback(
    async (userInput) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.post("/auth/register", userInput);
        const fallbackUser = {
          ...userInput,
          id:
            typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
              ? crypto.randomUUID()
              : Date.now(),
        };
        const payload = ensureAuthPayload(data, fallbackUser);
        return completeAuth(payload);
      } catch (err) {
        if (shouldFallbackToOfflineAuth(err)) {
          console.warn("Auth API unreachable, mocking register response.", err);
          const fallbackPayload = ensureAuthPayload(
            {},
            {
              ...userInput,
              id:
                typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
                  ? crypto.randomUUID()
                  : Date.now(),
            },
          );
          return completeAuth(fallbackPayload, { offline: true });
        }
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [completeAuth],
  );

  const updateUserPreferences = useCallback((preferences) => {
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            preferences,
          }
        : prev,
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
    [currentUser, token, login, register, logout, updateUserPreferences, loading, error],
  );

  return value;
};

export const authStorage = {
  getToken: () => storage.getToken(),
  setToken: (token) => storage.setToken(token),
  clearToken: () => storage.clearToken(),
};

export default useAuth;
