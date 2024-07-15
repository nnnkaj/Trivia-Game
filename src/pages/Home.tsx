import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto text-center p-4">
      <h1 className="text-3xl mb-4">Welcome to the Trivia Game</h1>
      <Link to="/quiz" className="mt-2 p-2 bg-blue-500 text-white rounded">
        Start Quiz
      </Link>
    </div>
  );
};

export default Home;
