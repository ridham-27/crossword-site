import { useContext } from 'react';
import { CrosswordContext } from '../contexts/CrosswordContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { crosswords } from '../data/crosswords';

const CrosswordSelector = () => {
  const { gameState, selectCrossword } = useContext(CrosswordContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="crossword-selector">
      <h3 style={{ color: theme.text }}>Select Puzzle</h3>
      <div className="crossword-options">
        {crosswords.map((crossword) => (
          <div 
            key={crossword.id}
            className={`crossword-option ${gameState.currentCrosswordId === crossword.id ? 'active' : ''}`}
            onClick={() => selectCrossword(crossword.id)}
            style={{ 
              backgroundColor: gameState.currentCrosswordId === crossword.id ? theme.secondary : theme.cardBackground,
              color: theme.text,
              borderColor: theme.primary
            }}
          >
            <span className="crossword-name">{crossword.name}</span>
            <span className="crossword-size">{crossword.gridSize}x{crossword.gridSize}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrosswordSelector;