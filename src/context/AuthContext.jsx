import { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    // Simple login - just set user and navigate
    const userData = {
      email: email,
      name: email.split('@')[0], // Use email prefix as name
      id: Date.now(), // Simple ID generation
    };
    
    setUser(userData);
    toast.success('Login successful!');
    return { success: true };
  };

  const register = async (userData) => {
    // Simple registration - just set user and navigate
    const newUser = {
      email: userData.email,
      name: userData.name,
      interests: userData.interests,
      id: Date.now(),
      needsOnboarding: true, // Flag to show onboarding page
    };
    
    setUser(newUser);
    toast.success('Registration successful!');
    return { success: true };
  };

  const updateUserPreferences = (preferences) => {
    // Update user with preferences from onboarding
    setUser({
      ...user,
      preferences,
      needsOnboarding: false,
    });
  };

  const logout = () => {
    setUser(null);
    toast.info('Logged out successfully');
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUserPreferences,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
