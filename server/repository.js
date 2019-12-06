const { createStore } = require('redux');

module.exports = {
  store: createStore(() => {}, { currentDeckId: '' }),
};
