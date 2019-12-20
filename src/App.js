import React from 'react';
import { Provider } from 'react-redux';

import config from './config';
import { store } from './store';
import Game from './components/Game';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store(config)}>
        <Game />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
