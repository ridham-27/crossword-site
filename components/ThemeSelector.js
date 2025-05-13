import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { saveThemeToLocalStorage } from '../utils/localStorage';

const ThemeSelector = () => {
  const { theme, setTheme, themeOptions } = useContext(ThemeContext);

  const handleThemeChange = (themeName) => {
    setTheme(themeOptions[themeName]);
    saveThemeToLocalStorage(themeName);
  };

  return (
    <div className="theme-selector">
      <div className="themes-list">
        {Object.keys(themeOptions).map((themeName) => (
          <div 
            key={themeName}
            className={`theme-option ${themeOptions[themeName] === theme ? 'active' : ''}`}
            onClick={() => handleThemeChange(themeName)}
          >
            <span className="theme-name">{themeName}</span>
            <div className="color-palette">
              {['primary', 'secondary', 'accent', 'success', 'error', 'warning'].map((colorKey) => (
                <div 
                  key={colorKey}
                  className="color-circle"
                  style={{ backgroundColor: themeOptions[themeName][colorKey] }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
