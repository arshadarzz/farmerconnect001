import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Fallback for web platform
const storage = {
  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    return SecureStore.setItemAsync(key, value);
  },
  async removeItem(key: string) {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    return SecureStore.deleteItemAsync(key);
  },
};

interface AppContextProps {
  isAuthenticated: boolean;
  language: string;
  setLanguage: (language: string) => void;
  login: (phoneNumber: string) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextProps>({
  isAuthenticated: false,
  language: 'en',
  setLanguage: () => {},
  login: () => {},
  logout: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const token = await storage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    // Get saved language
    const getSavedLanguage = async () => {
      const savedLanguage = await storage.getItem('language');
      if (savedLanguage) {
        setLanguageState(savedLanguage);
      }
    };

    checkAuth();
    getSavedLanguage();
  }, []);

  const login = async (phoneNumber: string) => {
    // In a real app, we would verify credentials and get a token
    await storage.setItem('authToken', 'dummy-token');
    await storage.setItem('phoneNumber', phoneNumber);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await storage.removeItem('authToken');
    await storage.removeItem('phoneNumber');
    setIsAuthenticated(false);
  };

  const setLanguage = async (lang: string) => {
    await storage.setItem('language', lang);
    setLanguageState(lang);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        language,
        setLanguage,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}