import { createContext, useContext, useEffect } from "react";
import useAuthManager from "../features/auth/useAuth";
import { AUTH_TOKEN_KEY, LEGACY_AUTH_TOKEN_KEYS } from "../constants/storageKeys";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return;
    }

    try {
      const hasModernToken = localStorage.getItem(AUTH_TOKEN_KEY);

      if (!hasModernToken) {
        for (const legacyKey of LEGACY_AUTH_TOKEN_KEYS) {
          const legacyValue = localStorage.getItem(legacyKey);
          if (legacyValue) {
            localStorage.setItem(AUTH_TOKEN_KEY, legacyValue);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Failed to migrate auth token", error);
    } finally {
      LEGACY_AUTH_TOKEN_KEYS.forEach((legacyKey) => {
        try {
          localStorage.removeItem(legacyKey);
        } catch (cleanupError) {
          console.warn(`Unable to remove legacy auth token key: ${legacyKey}`, cleanupError);
        }
      });
    }
  }, []);

  const auth = useAuthManager();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
