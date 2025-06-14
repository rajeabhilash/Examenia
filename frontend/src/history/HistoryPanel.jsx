import "react"
import { useState, useEffect } from "react";
import { MCQChallenge } from "../challenge/MCQChallenge";

export function HistoryPanel() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    // try {
    //   const response = await fetch('/api/history'); // Adjust the endpoint as needed
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch history');
    //   }
    //   const data = await response.json();
    //   setHistory(data);
    // } catch (err) {
    //   setError(err.message);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  if (isLoading) {
    return <div className="loading">Loading History...</div>;
  }

  if (error) {
    return <>
      <div className="error-message">
        <p>Error: {error}</p>
        <p>Please check your network connection or try again later.</p>
      </div>
      <br />
      <button className="retry-button" onClick={fetchHistory}>Retry</button>
    </>
  }

  return (
    <div className="history-panel">
      <h1>Previous challenges </h1>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <ul className="history-list">
          {history.map((challenge) => (
            <MCQChallenge key={challenge.id} challenge={challenge} showExplanation />
          ))}
        </ul>
      )}
    </div>
  );
}