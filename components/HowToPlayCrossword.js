import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const HowToPlayCrossword = ({ onClose }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="how-to-play-modal" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="modal-content" style={{ backgroundColor: theme.cardBackground }}>
        <button 
          className="close-button"
          onClick={onClose}
          style={{ color: theme.text }}
        >
          &times;
        </button>
        
        <h2 style={{ color: theme.text }}>How to Play</h2>
        
        <div className="instructions" style={{ color: theme.secondaryText }}>
          <ol>
            <li>Fill in words in the crossword grid based on the given clues.</li>
            <li>Click on a cell to select it, then type a letter to fill it in.</li>
            <li>Click on a cell twice to switch between "across" and "down" direction.</li>
            <li>Use Tab key to switch directions while in a cell.</li>
            <li>Use arrow keys to navigate between cells.</li>
            <li>Completed words will be marked in the clue list.</li>
          </ol>
        </div>
        
        <div className="tips" style={{ color: theme.secondaryText }}>
          <h3 style={{ color: theme.text }}>Tips:</h3>
          <ul>
            <li>You have 3 hints available - use them wisely!</li>
            <li>Clicking on a clue will select the corresponding starting cell.</li>
            <li>Words that intersect can help you solve difficult clues.</li>
            <li>You can customize the game's theme from the theme selector.</li>
            <li>Your progress and settings are saved automatically.</li>
          </ul>
        </div>
        
        <button 
          className="button"
          onClick={onClose}
          style={{ backgroundColor: theme.primary, color: theme.buttonText }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HowToPlayCrossword;