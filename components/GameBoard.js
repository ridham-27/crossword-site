import { useContext, useEffect } from 'react';
import QuestionDisplay from './QuestionDisplay';
import AnswerOptions from './AnswerOptions';
import Timer from './Timer';
import GameOver from './GameOver';
import { GameContext } from '../contexts/GameContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { saveGameProgressToLocalStorage } from '../utils/localStorage';

const GameBoard = () => {
  const { gameState, selectAnswer, nextQuestion } = useContext(GameContext);
  const { theme } = useContext(ThemeContext);

  // Save game progress whenever state changes
  useEffect(() => {
    if (gameState.isPlaying) {
      saveGameProgressToLocalStorage(gameState);
    }
  }, [gameState]);

  if (gameState.gameOver) {
    return <GameOver />;
  }

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  return (
    <div className="game-board" style={{ backgroundColor: theme.cardBackground }}>
      <div className="question-progress">
        <div className="progress-indicator">
          <span style={{ color: theme.success }}>{gameState.currentQuestionIndex + 1}</span>
          <span style={{ color: theme.text }}>/</span>
          <span style={{ color: theme.text }}>{gameState.questions.length}</span>
        </div>
        <Timer />
      </div>

      <QuestionDisplay question={currentQuestion.question} />
      
      <AnswerOptions 
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correctAnswer}
        selectedAnswer={gameState.selectedAnswer}
        onSelectAnswer={selectAnswer}
        questionAnswered={gameState.questionAnswered}
      />
    </div>
  );
};

export default GameBoard;
