// src/App.js

import React from 'react';
// 1) Import your lottery calculator component.
//    Make sure the filename matches exactly,
//    e.g., `lotterycal.jsx`.
import LotteryCal from './lotterycalc.jsx';

function App() {
  // 2) Return your component within the App component.
  return (
    <div className="App">
      <LotteryCal />
    </div>
  );
}

export default App;
