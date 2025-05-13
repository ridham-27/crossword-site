import { createContext, useState, useEffect, useCallback } from 'react';
import { questions } from '../data/questions';
import { getGameProgressFromLocalStorage, saveGameProgressToLocalStorage, clearGameProgressFromLocalStorage } from '../utils/localStorage';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    gameOver: false,
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    questionAnswered: false,
    correctAnswers: 0,
    wrongAnswers: 0
  });

  useEffect(() => {
    // Check for saved game progress on initial load
    const savedProgress = getGameProgressFromLocalStorage();
    if (savedProgress) {
      setGameState(savedProgress);
    } else {
      // Shuffle questions for a new game
      setGameState(prevState => ({
        ...prevState,
        questions: shuffleQuestions(questions)
      }));
    }
  }, []);

  const shuffleQuestions = (questionsArray) => {
    const shuffled = [...questionsArray].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10); // Get 10 random questions
  };

  const startGame = useCallback(() => {
    // Start a new game
    const shuffledQuestions = shuffleQuestions(questions);
    setGameState({
      isPlaying: true,
      gameOver: false,
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      questionAnswered: false,
      correctAnswers: 0,
      wrongAnswers: 0
    });
    saveGameProgressToLocalStorage({
      isPlaying: true,
      gameOver: false,
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      questionAnswered: false,
      correctAnswers: 0,
      wrongAnswers: 0
    });
  }, []);

  const resetGame = useCallback(() => {
    // Reset the game state to initial
    clearGameProgressFromLocalStorage();
    setGameState({
      isPlaying: false,
      gameOver: false,
      questions: shuffleQuestions(questions),
      currentQuestionIndex: 0,
      selectedAnswer: null,
      questionAnswered: false,
      correctAnswers: 0,
      wrongAnswers: 0
    });
  }, []);

  const selectAnswer = useCallback((answer) => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setGameState(prevState => {
      const newState = {
        ...prevState,
        selectedAnswer: answer,
        questionAnswered: true,
        correctAnswers: isCorrect ? prevState.correctAnswers + 1 : prevState.correctAnswers,
        wrongAnswers: !isCorrect ? prevState.wrongAnswers + 1 : prevState.wrongAnswers
      };
      
      saveGameProgressToLocalStorage(newState);
      return newState;
    });
  }, [gameState.currentQuestionIndex, gameState.questions]);

  const nextQuestion = useCallback(() => {
    const nextIndex = gameState.currentQuestionIndex + 1;
    
    if (nextIndex >= gameState.questions.length) {
      // Game over
      setGameState(prevState => {
        const newState = {
          ...prevState,
          isPlaying: false,
          gameOver: true
        };
        
        saveGameProgressToLocalStorage(newState);
        return newState;
      });
    } else {
      // Move to next question
      setGameState(prevState => {
        const newState = {
          ...prevState,
          currentQuestionIndex: nextIndex,
          selectedAnswer: null,
          questionAnswered: false
        };
        
        saveGameProgressToLocalStorage(newState);
        return newState;
      });
    }
  }, [gameState.currentQuestionIndex, gameState.questions.length]);

  const timeUp = useCallback(() => {
    if (!gameState.questionAnswered) {
      // Auto-select wrong answer if time is up
      setGameState(prevState => {
        const newState = {
          ...prevState,
          questionAnswered: true,
          wrongAnswers: prevState.wrongAnswers + 1
        };
        
        saveGameProgressToLocalStorage(newState);
        return newState;
      });
      
      // Auto-advance to next question after 2 seconds
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  }, [gameState.questionAnswered, nextQuestion]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        resetGame,
        selectAnswer,
        nextQuestion,
        timeUp
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
