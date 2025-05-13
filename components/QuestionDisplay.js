import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const QuestionDisplay = ({ question }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="question-display">
      <h2 style={{ color: theme.text, backgroundColor: theme.cardBackground }}>
        {question}
      </h2>
    </div>
  );
};

export default QuestionDisplay;
