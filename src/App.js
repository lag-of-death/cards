import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Deck from './components/Deck';
import { store } from './store';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="game">
          <Deck />
        </div>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
