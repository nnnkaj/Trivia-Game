import React, { useState } from 'react';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Props {
  question: Question;
  onNext: (correct: boolean) => void;
}

const TriviaQuestion: React.FC<Props> = ({ question, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const allAnswers = [...question.incorrect_answers, question.correct_answer].sort();

  const handleSubmit = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    onNext(selectedAnswer === question.correct_answer);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="p-4 mt-32 border rounded shadow-md">
      <h2 className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="space-y-2">
        {allAnswers.map((answer, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`answer-${index}`}
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => setSelectedAnswer(answer)}
              disabled={showAnswer}
              className="mr-2"
            />
            <label htmlFor={`answer-${index}`} dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        ))}
      </div>
      {showAnswer ? (
        <div className="mt-4">
          <p className={selectedAnswer === question.correct_answer ? 'text-green-500' : 'text-red-500'}>
            {selectedAnswer === question.correct_answer ? 'Correct!' : `Wrong! The correct answer is: ${question.correct_answer}`}
          </p>
          <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={handleNext}>
            Next
          </button>
        </div>
      ) : (
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default TriviaQuestion;
