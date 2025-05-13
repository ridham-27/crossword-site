import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { GameContext } from '../contexts/GameContext';

const AnswerOptions = ({ 
  options, 
  correctAnswer, 
  selectedAnswer, 
  onSelectAnswer, 
  questionAnswered 
}) => {
  const { theme } = useContext(ThemeContext);
  const { nextQuestion } = useContext(GameContext);

  const getOptionStyle = (option) => {
    if (!questionAnswered) {
      return {
        backgroundColor: selectedAnswer === option ? theme.secondary : theme.success,
        color: theme.buttonText
      };
    }
    
    if (option === correctAnswer) {
      return {
        backgroundColor: theme.success,
        color: theme.buttonText
      };
    }
    
    if (selectedAnswer === option && option !== correctAnswer) {
      return {
        backgroundColor: theme.error,
        color: theme.buttonText
      };
    }
    
    return {
      backgroundColor: theme.secondary,
      color: theme.buttonText,
      opacity: 0.7
    };
  };

  const getOptionLabel = (index) => {
    const labels = ['A', 'B', 'C', 'D'];
    return labels[index];
  };

  return (
    <div className="answer-options">
      {options.map((option, index) => (
        <button
          key={index}
          className="answer-option"
          style={getOptionStyle(option)}
          onClick={() => !questionAnswered && onSelectAnswer(option)}
          disabled={questionAnswered}
        >
          <span className="option-label">{getOptionLabel(index)})</span> {option}
        </button>
      ))}
      
      {questionAnswered && (
        <button 
          className="next-question-btn"
          style={{ 
            backgroundColor: theme.primary,
            color: theme.buttonText 
          }}
          onClick={nextQuestion}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default AnswerOptions;
