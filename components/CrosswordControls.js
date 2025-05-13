import { useContext } from 'react';
import { CrosswordContext } from '../contexts/CrosswordContext';
import { ThemeContext } from '../contexts/ThemeContext';

const CrosswordControls = () => {
  const { gameState, toggleDirection, useHint, resetGame } = useContext(CrosswordContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="crossword-controls">
      <button 
        className="control-button"
        onClick={toggleDirection}
        style={{ 
          backgroundColor: theme.secondary,
          color: theme.buttonText 
        }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16v16H4z"></path>
          <path d="M4 12h16"></path>
          <path d="M12 4v16"></path>
        </svg>
        Toggle Direction
      </button>
      
      <button 
        className="control-button"
        onClick={useHint}
        disabled={gameState.hints <= 0}
        style={{ 
          backgroundColor: gameState.hints > 0 ? theme.warning : theme.secondaryText,
          color: theme.buttonText,
          cursor: gameState.hints > 0 ? 'pointer' : 'not-allowed'
        }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        Use Hint ({gameState.hints})
      </button>
      
      <button 
        className="control-button"
        onClick={resetGame}
        style={{ 
          backgroundColor: theme.error,
          color: theme.buttonText 
        }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v6h6"></path>
          <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
          <path d="M21 22v-6h-6"></path>
          <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
        </svg>
        Reset Puzzle
      </button>
    </div>
  );
};

export default CrosswordControls;