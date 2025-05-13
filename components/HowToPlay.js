import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const HowToPlay = ({ onClose }) => {
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
            <li>You'll be asked a series of trivia questions.</li>
            <li>Choose the correct answer from the given options.</li>
            <li>You have 20 seconds to answer each question.</li>
            <li>Earn 1 point for each correct answer.</li>
            <li>See your final score at the end of the game.</li>
          </ol>
        </div>
        
        <div className="tips" style={{ color: theme.secondaryText }}>
          <h3 style={{ color: theme.text }}>Tips:</h3>
          <ul>
            <li>Read the question carefully before answering.</li>
            <li>Watch the timer - if time runs out, you'll move to the next question.</li>
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

export default HowToPlay;
