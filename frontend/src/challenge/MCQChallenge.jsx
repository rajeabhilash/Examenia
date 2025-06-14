import React from "react";
import { useState, useEffect } from "react";

// {
//   "content": "This is a placeholder for the MCQ Challenge component.",
//   "options": [
//     "Option A",
//     "Option B",
//     "Option C",
//     "Option D"
//   ],
//   "correctAnswer": "Option A",
//   "explanation": "This is a placeholder for the explanation of the correct answer."
//   "difficulty": "easy"
// }

export function MCQChallenge(challenge, showExplanation = false) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation);

  const options = typeof challenge.options === 'string' ? JSON.parse(challenge.options) : challenge.options;
  const correctAnswer = challenge.correctAnswer;

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return; // Prevent re-selection
    setSelectedOption(index);
    setShouldShowExplanation(true);
  }

  const getOptionClass = (index) => {
    if (selectedOption === null) return 'option';
    if (index === challenge.correct_answer_id) return 'correct';
    if (index === selectedOption && index !== challenge.correct_answer_id) return 'incorrect';
    return 'option';
  }

  return (
    <div className="challenge_display">
      <h1>MCQ Challenge</h1>
      <p> <strong>Difficulty:</strong> {challenge.difficulty || 'easy'} </p>
      <p className="challenge-title">{challenge.title}</p>
      <div className="options">
        {
          options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          ))
        }
      </div>
      {shouldShowExplanation && selectedOption !== null && (
        <div className="explanation">
          <p className="explanation-title">Explanation:</p>
          <p>{challenge.explanation}</p>
        </div>
      )}
    </div>
  );
}