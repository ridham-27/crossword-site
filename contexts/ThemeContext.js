import { createContext, useState, useEffect } from 'react';
import { themes } from '../styles/Theme';
import { getThemeFromLocalStorage, saveThemeToLocalStorage } from '../utils/localStorage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.Default);
  
  useEffect(() => {
    // Get saved theme from localStorage on initial load
    const savedTheme = getThemeFromLocalStorage();
    if (savedTheme && themes[savedTheme]) {
      setTheme(themes[savedTheme]);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeOptions: themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
