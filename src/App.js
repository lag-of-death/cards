import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Decks from './components/Decks';
import { store } from './store';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="game">
          <Decks />
        </div>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
