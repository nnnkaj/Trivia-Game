import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TriviaQuestion from './TriviaQuestion';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ApiResponse {
  results: Question[];
}

const TriviaGame: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<ApiResponse>('https://opentdb.com/api.php?amount=10');
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch questions. Please try again.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = (correct: boolean) => {
    if (correct) {
      setCorrectCount(correctCount + 1);
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/results', { state: { totalQuestions: questions.length, correctAnswers: correctCount } });
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      {questions.length > 0 ? (
        <TriviaQuestion question={questions[currentIndex]} onNext={handleNext} />
      ) : (
        <div>No questions available</div>
      )}
    </div>
  );
};

export default TriviaGame;
