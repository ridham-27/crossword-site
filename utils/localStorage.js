// Helper functions for localStorage operations

export const saveThemeToLocalStorage = (themeName) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('selectedTheme', themeName);
  }
};

export const getThemeFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('selectedTheme');
  }
  return null;
};

export const saveGameProgressToLocalStorage = (gameState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('gameProgress', JSON.stringify(gameState));
  }
};

export const getGameProgressFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedProgress = localStorage.getItem('gameProgress');
    return savedProgress ? JSON.parse(savedProgress) : null;
  }
  return null;
};

export const clearGameProgressFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('gameProgress');
  }
};

// Crossword-specific localStorage functions
export const saveCrosswordProgressToLocalStorage = (gameState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('crosswordProgress', JSON.stringify(gameState));
  }
};

export const getCrosswordProgressFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedProgress = localStorage.getItem('crosswordProgress');
    return savedProgress ? JSON.parse(savedProgress) : null;
  }
  return null;
};

export const clearCrosswordProgressFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('crosswordProgress');
  }
};
