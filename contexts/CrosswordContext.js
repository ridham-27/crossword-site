import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { crosswords } from '../data/crosswords';
import { 
  saveCrosswordProgressToLocalStorage, 
  getCrosswordProgressFromLocalStorage, 
  clearCrosswordProgressFromLocalStorage 
} from '../utils/localStorage';

export const CrosswordContext = createContext();

// 10 minutes in milliseconds
const GAME_TIME_LIMIT = 10 * 60 * 1000;

export const CrosswordProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    gameOver: false,
    timeUp: false,
    currentCrosswordId: 1,
    crosswordData: null,
    userAnswers: {}, // format: { 'row-col': 'character' }
    hints: 3,
    correctWords: 0,
    startTime: null,
    endTime: null,
    timeRemaining: GAME_TIME_LIMIT, // 10 minutes in milliseconds
    selectedCell: null, // format: { row, col, wordId, direction }
    selectedDirection: 'across', // 'across' or 'down'
    showTimeUpPopup: false,
  });
  
  const timerRef = useRef(null);

  useEffect(() => {
    // Check for saved crossword progress on initial load
    const savedProgress = getCrosswordProgressFromLocalStorage();
    if (savedProgress) {
      setGameState(savedProgress);
    } else {
      // Initialize with the first crossword
      const initialCrossword = crosswords.find(cw => cw.id === 1);
      setGameState(prevState => ({
        ...prevState,
        crosswordData: initialCrossword
      }));
    }
  }, []);

  // Save game progress when state changes
  useEffect(() => {
    if (gameState.isPlaying) {
      saveCrosswordProgressToLocalStorage(gameState);
    }
  }, [gameState]);
  
  // Set up the timer
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver && !gameState.timeUp) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Set up new timer
      timerRef.current = setInterval(() => {
        setGameState(prevState => {
          // Calculate time remaining
          const elapsedTime = new Date() - prevState.startTime;
          const newTimeRemaining = Math.max(0, GAME_TIME_LIMIT - elapsedTime);
          
          // Check if time's up
          if (newTimeRemaining <= 0) {
            clearInterval(timerRef.current);
            return {
              ...prevState,
              timeUp: true,
              showTimeUpPopup: true,
              timeRemaining: 0
            };
          }
          
          return {
            ...prevState,
            timeRemaining: newTimeRemaining
          };
        });
      }, 1000);
    }
    
    // Cleanup timer on unmount or game state change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.gameOver, gameState.timeUp]);

  const startGame = useCallback(() => {
    const selectedCrossword = crosswords.find(cw => cw.id === gameState.currentCrosswordId);
    
    setGameState({
      isPlaying: true,
      gameOver: false,
      timeUp: false,
      currentCrosswordId: gameState.currentCrosswordId,
      crosswordData: selectedCrossword,
      userAnswers: {},
      hints: 3,
      correctWords: 0,
      startTime: new Date(),
      endTime: null,
      timeRemaining: GAME_TIME_LIMIT,
      selectedCell: null,
      selectedDirection: 'across',
      showTimeUpPopup: false,
    });
  }, [gameState.currentCrosswordId]);

  const resetGame = useCallback(() => {
    clearCrosswordProgressFromLocalStorage();
    const selectedCrossword = crosswords.find(cw => cw.id === gameState.currentCrosswordId);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setGameState({
      isPlaying: false,
      gameOver: false,
      timeUp: false,
      currentCrosswordId: gameState.currentCrosswordId,
      crosswordData: selectedCrossword,
      userAnswers: {},
      hints: 3,
      correctWords: 0,
      startTime: null,
      endTime: null,
      timeRemaining: GAME_TIME_LIMIT,
      selectedCell: null,
      selectedDirection: 'across',
      showTimeUpPopup: false,
    });
  }, [gameState.currentCrosswordId]);

  const selectCrossword = useCallback((crosswordId) => {
    const selectedCrossword = crosswords.find(cw => cw.id === crosswordId);
    setGameState(prevState => ({
      ...prevState,
      currentCrosswordId: crosswordId,
      crosswordData: selectedCrossword,
      userAnswers: {},
      selectedCell: null,
    }));
  }, []);

  const selectCell = useCallback((row, col, wordId, direction) => {
    setGameState(prevState => {
      // If the user is explicitly switching between across/down by arrow keys, 
      // use the provided direction
      if (direction) {
        return {
          ...prevState,
          selectedCell: { row, col, wordId, direction },
          selectedDirection: direction
        };
      }
      // Otherwise, keep the current direction to maintain the user's context
      return {
        ...prevState,
        selectedCell: { 
          row, 
          col, 
          wordId, 
          direction: prevState.selectedDirection 
        }
      };
    });
  }, []);

  const toggleDirection = useCallback(() => {
    setGameState(prevState => {
      const newDirection = prevState.selectedDirection === 'across' ? 'down' : 'across';
      
      // Also update the direction in the selectedCell to maintain consistency
      return {
        ...prevState,
        selectedDirection: newDirection,
        selectedCell: prevState.selectedCell ? {
          ...prevState.selectedCell,
          direction: newDirection
        } : null
      };
    });
  }, []);

  const closeTimeUpPopup = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      showTimeUpPopup: false
    }));
  }, []);

  const updateAnswer = useCallback((row, col, value) => {
    const cellKey = `${row}-${col}`;
    
    setGameState(prevState => {
      if (prevState.timeUp || prevState.gameOver) {
        return prevState;
      }
      
      const newUserAnswers = { ...prevState.userAnswers, [cellKey]: value };
      
      // Check if any words are completed
      let correctWords = 0;
      if (prevState.crosswordData) {
        prevState.crosswordData.words.forEach(word => {
          let isWordComplete = true;
          let isWordCorrect = true;
          
          // Check each letter of the word
          for (let i = 0; i < word.word.length; i++) {
            let currentRow = word.startRow;
            let currentCol = word.startCol;
            
            if (word.direction === 'across') {
              currentCol += i;
            } else { // direction is 'down'
              currentRow += i;
            }
            
            const cellKey = `${currentRow}-${currentCol}`;
            const userValue = newUserAnswers[cellKey];
            
            // If any letter is missing, the word is not complete
            if (!userValue) {
              isWordComplete = false;
              break;
            }
            
            // If any letter is incorrect, the word is not correct
            if (userValue.toUpperCase() !== word.word[i].toUpperCase()) {
              isWordCorrect = false;
            }
          }
          
          if (isWordComplete && isWordCorrect) {
            correctWords++;
          }
        });
      }
      
      // Check if the game is over (all words are correct)
      const isGameOver = prevState.crosswordData && correctWords === prevState.crosswordData.words.length;
      
      const newState = {
        ...prevState,
        userAnswers: newUserAnswers,
        correctWords,
        gameOver: isGameOver,
        endTime: isGameOver ? new Date() : prevState.endTime
      };
      
      // Find the next cell to move to - only if value was entered (not cleared)
      if (prevState.selectedCell && value) {
        // Get the direction
        const direction = prevState.selectedDirection;
        const grid = Array(prevState.crosswordData.gridSize).fill().map(() => Array(prevState.crosswordData.gridSize).fill(null));
        
        // Fill the grid with word data
        prevState.crosswordData.words.forEach(word => {
          for (let i = 0; i < word.word.length; i++) {
            let currentRow = word.startRow;
            let currentCol = word.startCol;
            
            if (word.direction === 'across') {
              currentCol += i;
            } else {
              currentRow += i;
            }
            
            if (!grid[currentRow][currentCol]) {
              grid[currentRow][currentCol] = { isActive: true };
            }
          }
        });
        
        // Find next cell in current direction
        if (direction === 'across') {
          let nextCol = prevState.selectedCell.col + 1;
          let nextRow = prevState.selectedCell.row;
          
          // Skip inactive cells or out of bounds
          while (nextCol < prevState.crosswordData.gridSize) {
            if (grid[nextRow] && grid[nextRow][nextCol] && grid[nextRow][nextCol].isActive) {
              newState.selectedCell = {
                ...prevState.selectedCell,
                col: nextCol,
                direction: 'across'
              };
              break;
            }
            nextCol++;
          }
        } else { // direction is 'down'
          let nextRow = prevState.selectedCell.row + 1;
          let nextCol = prevState.selectedCell.col;
          
          // Skip inactive cells or out of bounds
          while (nextRow < prevState.crosswordData.gridSize) {
            if (grid[nextRow] && grid[nextRow][nextCol] && grid[nextRow][nextCol].isActive) {
              newState.selectedCell = {
                ...prevState.selectedCell,
                row: nextRow,
                direction: 'down'
              };
              break;
            }
            nextRow++;
          }
        }
      }
      
      return newState;
    });
  }, []);

  const useHint = useCallback(() => {
    if (gameState.hints <= 0 || !gameState.selectedCell || gameState.timeUp) return;
    
    const { row, col } = gameState.selectedCell;
    const cellKey = `${row}-${col}`;
    
    // Find the correct letter for this cell
    let correctLetter = '';
    
    if (gameState.crosswordData) {
      gameState.crosswordData.words.forEach(word => {
        for (let i = 0; i < word.word.length; i++) {
          let currentRow = word.startRow;
          let currentCol = word.startCol;
          
          if (word.direction === 'across') {
            currentCol += i;
          } else { // direction is 'down'
            currentRow += i;
          }
          
          if (currentRow === row && currentCol === col) {
            correctLetter = word.word[i];
            return;
          }
        }
      });
    }
    
    if (correctLetter) {
      setGameState(prevState => ({
        ...prevState,
        userAnswers: { ...prevState.userAnswers, [cellKey]: correctLetter },
        hints: prevState.hints - 1
      }));
    }
  }, [gameState.hints, gameState.selectedCell, gameState.crosswordData, gameState.timeUp]);

  return (
    <CrosswordContext.Provider
      value={{
        gameState,
        startGame,
        resetGame,
        selectCrossword,
        selectCell,
        toggleDirection,
        updateAnswer,
        useHint,
        closeTimeUpPopup
      }}
    >
      {children}
    </CrosswordContext.Provider>
  );
};