import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ResultsState {
  totalQuestions: number;
  correctAnswers: number;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuestions, correctAnswers } = location.state as ResultsState;

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="container h-full mt-12 mx-auto text-center p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6">Quiz Results</h1>
      <div className="text-xl mb-4">
        <p>Total Questions: {totalQuestions}</p>
        <p>Total Correct Questions: {correctAnswers}</p>
        <p>Total Incorrect Questions: {totalQuestions - correctAnswers}</p>
      </div>
      <button
        onClick={handlePlayAgain}
        className="mt-8 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded hover:bg-blue-600 transition duration-300"
      >
        Play Again
      </button>
    </div>
  );
};

export default Results;
