import React from 'react';
import './App.css';
import Deck from './components/Deck';

function App() {
  return (
    <React.StrictMode>
      <div className="game">
        <Deck />
      </div>
    </React.StrictMode>
  );
}

export default App;
