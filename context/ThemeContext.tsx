import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDark: false,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const systemColorScheme = useColorScheme();
  const isDark =
    theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');

  useEffect(() => {
    if (Platform.OS === 'web') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setThemeState(savedTheme as Theme);
      }
    } else {
      SecureStore.getItemAsync('theme').then((savedTheme) => {
        if (savedTheme) {
          setThemeState(savedTheme as Theme);
        }
      });
    }
  }, []);

  const setTheme = async (newTheme: Theme) => {
    if (Platform.OS === 'web') {
      localStorage.setItem('theme', newTheme);
    } else {
      await SecureStore.setItemAsync('theme', newTheme);
    }
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
