import React from 'react';
import { useState, useEffect } from 'react';
import { MCQChallenge } from './MCQChallenge';

export function ChallangeGenerator() {

  const [challenges, setChallenges] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [quota, setQuota] = useState(null);

  const fetchQuota = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/quota');
      if (!response.ok) {
        throw new Error('Failed to fetch quota');
      }
      const data = await response.json();
      setQuota(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChallenges = async () => { }
  const generateChallenges = async () => { }
  const getNextResetTime = () => { }


  return (
    <div className='challenge-container'>
      <h1>Challenge Generator</h1>
      <p>Kindly Generate your challenges here!</p>
      <div className='quota-display'>
        <p>Challenges remaining today : {quota?.quota_remaining || 0}</p>
        {
          quota?.quota_remaining === 0 && (
            <p className='quota-reset'>Quota resets at {0}</p>
          )
        }
      </div>
      <div className='difficulty-selector'>
        <label htmlFor='difficulty'>Select Difficulty:</label>
        <select
          id='difficulty'
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isLoading}
        >
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
      </div>
      <button
        className='generate-button'
        onClick={generateChallenges}
        disabled={isLoading || (quota && quota.quota_remaining <= 0)}
      >
        {isLoading ? 'Generating...' : 'Generate Challenges'}
      </button>
      {error && <p className='error-message'>Error: {error}</p>}

      {challenges && challenges.length > 0 ? (
        <div className='challenge-list'>
          {challenges.map((challenge, index) => (
            <MCQChallenge key={index} challenge={challenge} showExplanation = {false}/>
          ))}
        </div>
      ) : (
        <div>
          <p>No challenges generated yet.</p>
        </div>
      )}
    </div>
  );
}