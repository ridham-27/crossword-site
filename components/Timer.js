import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Timer = () => {
  const { gameState, timeUp } = useContext(GameContext);
  const { theme } = useContext(ThemeContext);
  const [timeLeft, setTimeLeft] = useState(20);
  
  useEffect(() => {
    // Reset timer when moving to a new question
    if (!gameState.questionAnswered) {
      setTimeLeft(20);
    }
  }, [gameState.currentQuestionIndex, gameState.questionAnswered]);

  useEffect(() => {
    let timer;
    
    if (gameState.isPlaying && !gameState.questionAnswered && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !gameState.questionAnswered) {
      timeUp();
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, gameState.isPlaying, gameState.questionAnswered, timeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 5) return theme.error;
    if (timeLeft <= 10) return theme.warning;
    return theme.text;
  };

  return (
    <div className="timer" style={{ color: getTimerColor() }}>
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
