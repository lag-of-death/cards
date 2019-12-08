import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import Game from './components/Game';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Game />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
