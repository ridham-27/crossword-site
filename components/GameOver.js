import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { ThemeContext } from '../contexts/ThemeContext';

const GameOver = () => {
  const { gameState, resetGame } = useContext(GameContext);
  const { theme } = useContext(ThemeContext);
  
  const score = gameState.correctAnswers;
  const totalQuestions = gameState.questions.length;
  
  const handleShareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Trivia Challenge Score',
        text: `I scored ${score}/${totalQuestions} on Trivia Challenge! Can you beat me?`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `I scored ${score}/${totalQuestions} on Trivia Challenge! Can you beat me?`;
      navigator.clipboard.writeText(shareText)
        .then(() => alert('Score copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  return (
    <div className="game-over" style={{ backgroundColor: theme.cardBackground }}>
      <div className="trophy-icon" style={{ backgroundColor: theme.success }}>
        <svg viewBox="0 0 24 24" width="48" height="48" stroke={theme.buttonText} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15l8.385-8.415a2.1 2.1 0 0 0 0-2.97 2.1 2.1 0 0 0-2.97 0L9 12l-7.415-7.415a2.1 2.1 0 0 0-2.97 0 2.1 2.1 0 0 0 0 2.97L7.03 15.97a2.1 2.1 0 0 0 2.97 0L12 15z"></path>
          <path d="M7.5 8h.01M10.5 11h.01M9 6.5V6h.01M12 9h.01M14.5 11.5h.01"></path>
        </svg>
      </div>
      
      <h2 style={{ color: theme.text }}>Game Over!</h2>
      
      <p style={{ color: theme.secondaryText }}>
        Better luck next time!
      </p>
      
      <div className="score-container">
        <div className="score-box" style={{ backgroundColor: theme.secondary }}>
          <span style={{ color: theme.buttonText }}>Score</span>
          <span className="score-value" style={{ color: theme.buttonText }}>{score}</span>
        </div>
        
        <div className="score-box" style={{ backgroundColor: theme.success }}>
          <span style={{ color: theme.buttonText }}>{score}/{totalQuestions}</span>
        </div>
      </div>
      
      <div className="profile-view" style={{ backgroundColor: theme.cardBackground }}>
        <div className="view-button" style={{ backgroundColor: theme.text, color: theme.background }}>
          View
        </div>
      </div>
      
      <div className="game-over-actions">
        <button 
          className="button"
          onClick={resetGame}
          style={{ backgroundColor: theme.primary, color: theme.buttonText }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          Play Again
        </button>
        
        <button 
          className="button"
          onClick={resetGame}
          style={{ backgroundColor: theme.success, color: theme.buttonText }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </button>
        
        <button 
          className="button"
          onClick={handleShareScore}
          style={{ backgroundColor: theme.error, color: theme.buttonText }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          Share Score
        </button>
      </div>
    </div>
  );
};

export default GameOver;
