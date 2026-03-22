"use client";

import React, { useState } from 'react';
import './globals.css';

function App() {
  const [cups, setCups] = useState(0);
  const [data, setData] = useState(null);

  const analyzeCaffeine = async () => {
  const apiBase = window.location.hostname === "localhost" 
    ? "http://localhost" 
    : `http://${window.location.hostname}`;

  const response = await fetch(`${apiBase}/api/coffee?cups=${cups}`);
  const result = await response.json();
  setData(result);
};

  return (
    <div className="container">
      <h1>☕ Caffeine Meter v1.0</h1>
      <div className="card">
        <label>How many cups of coffee have you had today?</label>
        <input type="number" value={cups} onChange={(e) => setCups(e.target.value)} />
        <button onClick={analyzeCaffeine}>Calculate Impact</button>
      </div>

      {data && (
        <div className="result-grid">
          <div className="result-card">
            <h3>Lines of Code</h3>
            <p className="big-number">{data.estimated_lines_of_code}</p>
          </div>
          <div className="result-card">
            <h3>Bug Rate</h3>
            <p className="big-number">{data.bug_analysis.bug_rate}</p>
          </div>
          <div className="status">
            Status: {data.message}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;