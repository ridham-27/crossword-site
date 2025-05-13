import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { CrosswordContext } from '../contexts/CrosswordContext';

const TimeUpPopup = () => {
  const { theme } = useContext(ThemeContext);
  const { resetGame, closeTimeUpPopup } = useContext(CrosswordContext);

  const handleTryAgain = () => {
    closeTimeUpPopup();
    resetGame();
  };

  return (
    <div className="how-to-play-modal" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <div className="modal-content" style={{ backgroundColor: theme.cardBackground }}>
        <h2 style={{ color: theme.error, marginBottom: '20px' }}>Time's Up!</h2>
        
        <p style={{ color: theme.text, marginBottom: '30px', fontSize: '1.1rem' }}>
          Sorry, you've run out of time. The puzzle must be completed within 10 minutes.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            className="button"
            onClick={handleTryAgain}
            style={{ backgroundColor: theme.primary, color: theme.buttonText }}
          >
            Try Again
          </button>
          
          <button 
            className="button"
            onClick={closeTimeUpPopup}
            style={{ backgroundColor: theme.secondary, color: theme.buttonText }}
          >
            Review Puzzle
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeUpPopup;