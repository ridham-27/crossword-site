import { useContext, useEffect } from 'react';
import Link from 'next/link';
import CrosswordGrid from './CrosswordGrid';
import CrosswordClues from './CrosswordClues';
import CrosswordControls from './CrosswordControls';
import CrosswordComplete from './CrosswordComplete';
import TimeUpPopup from './TimeUpPopup';
import { CrosswordContext } from '../contexts/CrosswordContext';
import { ThemeContext } from '../contexts/ThemeContext';

const CrosswordBoard = () => {
  const { gameState } = useContext(CrosswordContext);
  const { theme } = useContext(ThemeContext);

  // Format time remaining in MM:SS format
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get timer color based on time remaining
  const getTimerColor = () => {
    const minutesLeft = Math.floor(gameState.timeRemaining / (60 * 1000));
    if (minutesLeft < 1) return theme.error;
    if (minutesLeft < 3) return theme.warning;
    return theme.success;
  };

  if (gameState.gameOver) {
    return <CrosswordComplete />;
  }

  return (
    <div className="crossword-board" style={{ backgroundColor: theme.cardBackground }}>
      <div className="board-header">
        <Link href="/preview" className="view-preview-link" style={{ color: theme.primary }}>
          View all screens
        </Link>
      </div>

      <div className="crossword-top-bar">
        <div className="puzzle-progress">
          <span style={{ color: theme.success }}>{gameState.correctWords}</span>
          <span style={{ color: theme.text }}>/</span>
          <span style={{ color: theme.text }}>
            {gameState.crosswordData ? gameState.crosswordData.words.length : 0}
          </span>
          <span style={{ color: theme.secondaryText }}> words</span>
        </div>
        
        <div className="timer" style={{ color: getTimerColor() }}>
          <span>{formatTime(gameState.timeRemaining)}</span>
        </div>
        
        <div className="hints-left" style={{ color: gameState.hints > 0 ? theme.warning : theme.error }}>
          <span>{gameState.hints}</span>
          <span style={{ color: theme.secondaryText }}> hints</span>
        </div>
      </div>

      <div className="crossword-content">
        <CrosswordGrid />
        <CrosswordClues />
      </div>
      
      <CrosswordControls />
      
      {gameState.showTimeUpPopup && (
        <TimeUpPopup />
      )}

      <style jsx>{`
        .board-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
        
        .view-preview-link {
          font-size: 0.9rem;
          text-decoration: none;
        }
        
        .view-preview-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default CrosswordBoard;