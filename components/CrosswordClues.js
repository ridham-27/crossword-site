import { useContext } from 'react';
import { CrosswordContext } from '../contexts/CrosswordContext';
import { ThemeContext } from '../contexts/ThemeContext';

const CrosswordClues = () => {
  const { gameState, selectCell } = useContext(CrosswordContext);
  const { theme } = useContext(ThemeContext);

  if (!gameState.crosswordData) {
    return null;
  }

  const { words } = gameState.crosswordData;

  // Create numbered word mappings for clues
  const wordStartPositions = [];
  words.forEach(word => {
    wordStartPositions.push({
      row: word.startRow,
      col: word.startCol,
      direction: word.direction,
      word: word.word,
      clue: word.clue,
      index: words.indexOf(word)
    });
  });
  
  // Sort positions by row then col for consistent numbering
  wordStartPositions.sort((a, b) => {
    if (a.row !== b.row) return a.row - b.row;
    return a.col - b.col;
  });
  
  // Assign numbers
  const numberedWordPositions = {};
  const assignedPositions = {};
  let clueNumber = 1;
  
  wordStartPositions.forEach(pos => {
    const posKey = `${pos.row}-${pos.col}`;
    
    // If this position hasn't been assigned a number yet
    if (!assignedPositions[posKey]) {
      assignedPositions[posKey] = clueNumber;
      numberedWordPositions[`${pos.index}-${pos.direction}`] = {
        number: clueNumber,
        word: pos.word,
        clue: pos.clue,
        row: pos.row,
        col: pos.col,
        direction: pos.direction,
        index: pos.index
      };
      clueNumber++;
    } else {
      // Use the existing number for this position
      numberedWordPositions[`${pos.index}-${pos.direction}`] = {
        number: assignedPositions[posKey],
        word: pos.word,
        clue: pos.clue,
        row: pos.row,
        col: pos.col,
        direction: pos.direction,
        index: pos.index
      };
    }
  });

  // Get clues sorted by their numbers
  const acrossClues = [];
  const downClues = [];
  
  Object.values(numberedWordPositions).forEach(wordInfo => {
    if (wordInfo.direction === 'across') {
      acrossClues.push(wordInfo);
    } else {
      downClues.push(wordInfo);
    }
  });
  
  // Sort by clue number
  acrossClues.sort((a, b) => a.number - b.number);
  downClues.sort((a, b) => a.number - b.number);

  // Check if word is completed correctly
  const isWordComplete = (wordInfo) => {
    const word = words[wordInfo.index];
    
    for (let i = 0; i < word.word.length; i++) {
      let row = word.startRow;
      let col = word.startCol;
      
      if (word.direction === 'across') {
        col += i;
      } else {
        row += i;
      }
      
      const cellKey = `${row}-${col}`;
      const userAnswer = gameState.userAnswers[cellKey];
      
      if (!userAnswer || userAnswer.toUpperCase() !== word.word[i]) {
        return false;
      }
    }
    
    return true;
  };

  // Check if word is the currently selected word
  const isSelectedWord = (wordInfo) => {
    if (!gameState.selectedCell) return false;
    
    // Get the word at the selected cell in the selected direction
    const selectedRow = gameState.selectedCell.row;
    const selectedCol = gameState.selectedCell.col;
    const selectedDirection = gameState.selectedDirection;
    
    if (selectedDirection !== wordInfo.direction) return false;
    
    // Find the word that contains the selected cell in the selected direction
    const word = words[wordInfo.index];
    
    // Check if selected cell is within this word
    for (let i = 0; i < word.word.length; i++) {
      let row = word.startRow;
      let col = word.startCol;
      
      if (word.direction === 'across') {
        col += i;
      } else {
        row += i;
      }
      
      if (row === selectedRow && col === selectedCol) {
        return true;
      }
    }
    
    return false;
  };

  const handleClueClick = (wordInfo) => {
    // Explicitly set the direction based on the clicked clue
    selectCell(wordInfo.row, wordInfo.col, words[wordInfo.index].word, wordInfo.direction);
    
    // Force the selected direction to match the clue direction (across or down)
    if (gameState.selectedDirection !== wordInfo.direction) {
      setTimeout(() => {
        // This is a workaround since we don't have access to toggleDirection
        // The setTimeout ensures this runs after selectCell updates the state
        selectCell(wordInfo.row, wordInfo.col, words[wordInfo.index].word, wordInfo.direction);
      }, 50);
    }
  };

  return (
    <div className="crossword-clues">
      <div className="clue-section">
        <h3 style={{ color: theme.text }}>Across</h3>
        <ul>
          {acrossClues.map((wordInfo) => (
            <li 
              key={`across-${wordInfo.index}`} 
              onClick={() => handleClueClick(wordInfo)}
              className={`clue ${isWordComplete(wordInfo) ? 'completed' : ''} ${
                isSelectedWord(wordInfo) ? 'selected' : ''
              }`}
              style={{ 
                color: isWordComplete(wordInfo) ? theme.success : theme.text,
                backgroundColor: isSelectedWord(wordInfo) ? theme.secondary : 'transparent'
              }}
            >
              <span className="clue-number">{wordInfo.number}.</span> {wordInfo.clue}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="clue-section">
        <h3 style={{ color: theme.text }}>Down</h3>
        <ul>
          {downClues.map((wordInfo) => (
            <li 
              key={`down-${wordInfo.index}`} 
              onClick={() => handleClueClick(wordInfo)}
              className={`clue ${isWordComplete(wordInfo) ? 'completed' : ''} ${
                isSelectedWord(wordInfo) ? 'selected' : ''
              }`}
              style={{ 
                color: isWordComplete(wordInfo) ? theme.success : theme.text,
                backgroundColor: isSelectedWord(wordInfo) ? theme.secondary : 'transparent'
              }}
            >
              <span className="clue-number">{wordInfo.number}.</span> {wordInfo.clue}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrosswordClues;