import { useContext, useRef, useEffect, useState } from 'react';
import { CrosswordContext } from '../contexts/CrosswordContext';
import { ThemeContext } from '../contexts/ThemeContext';

const CrosswordGrid = () => {
  const { gameState, selectCell, updateAnswer, toggleDirection } = useContext(CrosswordContext);
  const { theme } = useContext(ThemeContext);
  const gridRef = useRef(null);
  const [wordNumberMapping, setWordNumberMapping] = useState({});

  useEffect(() => {
    // Focus on selected cell
    if (gameState.selectedCell) {
      const { row, col } = gameState.selectedCell;
      const cellElement = document.getElementById(`cell-${row}-${col}`);
      if (cellElement) {
        cellElement.focus();
      }
    }
  }, [gameState.selectedCell]);

  if (!gameState.crosswordData) {
    return <div className="loading">Loading crossword...</div>;
  }

  const { gridSize, words } = gameState.crosswordData;

  // Create an empty grid
  const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
  
  // Create numbered word mappings for clues
  const wordStartPositions = [];
  words.forEach(word => {
    wordStartPositions.push({
      row: word.startRow,
      col: word.startCol,
      direction: word.direction,
      word: word.word
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
      numberedWordPositions[`${pos.word}-${pos.direction}`] = clueNumber;
      clueNumber++;
    } else {
      // Use the existing number for this position
      numberedWordPositions[`${pos.word}-${pos.direction}`] = assignedPositions[posKey];
    }
  });
  
  // Populate grid with word data
  words.forEach((word, wordIndex) => {
    const wordNumber = numberedWordPositions[`${word.word}-${word.direction}`];
    
    for (let i = 0; i < word.word.length; i++) {
      let row = word.startRow;
      let col = word.startCol;
      
      if (word.direction === 'across') {
        col += i;
      } else { // direction is 'down'
        row += i;
      }
      
      if (!grid[row][col]) {
        grid[row][col] = {
          isActive: true,
          wordIds: [{
            word: word.word,
            index: wordIndex,
            direction: word.direction,
            number: wordNumber,
            isStart: i === 0
          }],
          number: i === 0 ? wordNumber : null
        };
      } else {
        grid[row][col].wordIds.push({
          word: word.word,
          index: wordIndex,
          direction: word.direction,
          number: wordNumber,
          isStart: i === 0
        });
        
        // If this is a start cell and doesn't have a number yet
        if (i === 0 && grid[row][col].number === null) {
          grid[row][col].number = wordNumber;
        }
      }
    }
  });

  const handleCellClick = (row, col) => {
    // Find which words this cell belongs to
    const cell = grid[row][col];
    if (!cell || !cell.isActive) return;

    // If there's a current selection with the same coordinates, toggle direction
    if (
      gameState.selectedCell && 
      gameState.selectedCell.row === row && 
      gameState.selectedCell.col === col
    ) {
      toggleDirection();
      return;
    }

    // Find words that contain this cell
    let acrossWord = null;
    let downWord = null;
    
    for (const wordData of cell.wordIds) {
      const word = words[wordData.index];
      if (word.direction === 'across') {
        acrossWord = { 
          word: word.word, 
          wordId: wordData.index, 
          number: wordData.number,
          direction: 'across' 
        };
      } else if (word.direction === 'down') {
        downWord = { 
          word: word.word, 
          wordId: wordData.index, 
          number: wordData.number,
          direction: 'down' 
        };
      }
    }

    // Determine which word to select
    let selectedWord;
    let selectedDirection = gameState.selectedDirection;
    
    // If we have both directions, prefer the current direction
    if (acrossWord && downWord) {
      if (selectedDirection === 'across' && acrossWord) {
        selectedWord = acrossWord;
      } else if (selectedDirection === 'down' && downWord) {
        selectedWord = downWord;
      } else {
        // Default to what we have
        selectedWord = acrossWord || downWord;
        selectedDirection = selectedWord.direction;
      }
    } else {
      // Only one direction available
      selectedWord = acrossWord || downWord;
      if (selectedWord) {
        selectedDirection = selectedWord.direction;
      }
    }

    if (selectedWord) {
      selectCell(row, col, selectedWord.word, selectedDirection);
    }
  };

  const handleKeyDown = (e, row, col) => {
    const cell = grid[row][col];
    if (!cell || !cell.isActive) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      toggleDirection();
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      // Clear the current cell and move back
      const cellKey = `${row}-${col}`;
      updateAnswer(row, col, '');

      // Move to previous cell if in across mode
      if (gameState.selectedDirection === 'across' && col > 0) {
        const prevCol = col - 1;
        const prevCell = grid[row][prevCol];
        if (prevCell && prevCell.isActive) {
          selectCell(row, prevCol, null, 'across');
        }
      } 
      // Move to previous cell if in down mode
      else if (gameState.selectedDirection === 'down' && row > 0) {
        const prevRow = row - 1;
        const prevCell = grid[prevRow][col];
        if (prevCell && prevCell.isActive) {
          selectCell(prevRow, col, null, 'down');
        }
      }
      return;
    }

    // Handle arrow keys
    if (e.key === 'ArrowUp' && row > 0) {
      const upCell = grid[row-1][col];
      if (upCell && upCell.isActive) {
        selectCell(row-1, col, null, 'down');
      }
      return;
    }
    
    if (e.key === 'ArrowDown' && row < gridSize - 1) {
      const downCell = grid[row+1][col];
      if (downCell && downCell.isActive) {
        selectCell(row+1, col, null, 'down');
      }
      return;
    }
    
    if (e.key === 'ArrowLeft' && col > 0) {
      const leftCell = grid[row][col-1];
      if (leftCell && leftCell.isActive) {
        selectCell(row, col-1, null, 'across');
      }
      return;
    }
    
    if (e.key === 'ArrowRight' && col < gridSize - 1) {
      const rightCell = grid[row][col+1];
      if (rightCell && rightCell.isActive) {
        selectCell(row, col+1, null, 'across');
      }
      return;
    }

    // Handle letter input
    if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      updateAnswer(row, col, e.key.toUpperCase());
    }
  };

  const isPartOfSelectedWord = (row, col) => {
    if (!gameState.selectedCell) return false;
    
    const cell = grid[row][col];
    if (!cell || !cell.isActive) return false;
    
    const { direction } = gameState.selectedCell;
    
    // Look for words in the selected direction that contain this cell
    return cell.wordIds.some(wordData => {
      if (wordData.direction !== direction) return false;
      
      // Get the actual word object
      const word = words[wordData.index];
      
      // Check if our selected cell is in this word
      for (let i = 0; i < word.word.length; i++) {
        let currentRow = word.startRow;
        let currentCol = word.startCol;
        
        if (word.direction === 'across') {
          currentCol += i;
        } else {
          currentRow += i;
        }
        
        // Is the selected cell in this word?
        if (currentRow === gameState.selectedCell.row && 
            currentCol === gameState.selectedCell.col) {
          
          // Is the checked cell also in this word?
          for (let j = 0; j < word.word.length; j++) {
            let wordRow = word.startRow;
            let wordCol = word.startCol;
            
            if (word.direction === 'across') {
              wordCol += j;
            } else {
              wordRow += j;
            }
            
            if (wordRow === row && wordCol === col) {
              return true;
            }
          }
        }
      }
      
      return false;
    });
  };

  const getCellStyle = (row, col) => {
    const cell = grid[row][col];
    const cellKey = `${row}-${col}`;
    const userAnswer = gameState.userAnswers[cellKey];
    
    if (!cell || !cell.isActive) {
      return {
        backgroundColor: theme.background,
        border: 'none'
      };
    }

    // Check if this is the selected cell
    const isSelected = gameState.selectedCell && 
                      gameState.selectedCell.row === row && 
                      gameState.selectedCell.col === col;

    // Check if cell is in the current word
    const isInSelectedWord = isPartOfSelectedWord(row, col);
    
    let backgroundColor = theme.cardBackground;
    let textColor = userAnswer ? theme.text : 'transparent';
    
    if (isSelected) {
      backgroundColor = theme.primary;
      textColor = theme.buttonText;
    } else if (isInSelectedWord) {
      backgroundColor = theme.secondary;
    }
    
    return {
      backgroundColor,
      borderColor: theme.text,
      color: textColor
    };
  };

  return (
    <div className="crossword-grid-container" ref={gridRef}>
      <div 
        className="crossword-grid" 
        style={{ 
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          backgroundColor: theme.background
        }}
      >
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`}
              className={`crossword-cell ${cell && cell.isActive ? 'active' : 'inactive'} ${
                gameState.selectedCell && 
                gameState.selectedCell.row === rowIndex && 
                gameState.selectedCell.col === colIndex ? 'selected' : ''
              } ${isPartOfSelectedWord(rowIndex, colIndex) ? 'in-word' : ''}`}
              style={getCellStyle(rowIndex, colIndex)}
              onClick={() => cell && cell.isActive && handleCellClick(rowIndex, colIndex)}
              tabIndex={cell && cell.isActive ? 0 : -1}
              onKeyDown={(e) => cell && cell.isActive && handleKeyDown(e, rowIndex, colIndex)}
              id={`cell-${rowIndex}-${colIndex}`}
            >
              {cell && cell.isActive && (
                <>
                  {cell.number && <div className="cell-number" style={{ color: theme.secondaryText }}>{cell.number}</div>}
                  <div className="cell-letter">
                    {gameState.userAnswers[`${rowIndex}-${colIndex}`] || ''}
                  </div>
                </>
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default CrosswordGrid;