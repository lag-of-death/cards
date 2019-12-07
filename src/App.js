import React from 'react';
import { Provider } from 'react-redux';

import './App.css';

import Decks from './components/Decks';
import Shuffle from './components/Shuffle';
import Restart from './components/Restart';

import { store } from './store';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="game">
          <Restart />
          <Shuffle />
          <Decks />
        </div>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
