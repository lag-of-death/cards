const express = require('express');

const { getDecks, getShuffledDecks, saveScore } = require('./server/controllers');
const config = require('./src/config');

const app = express();

app.use(express.static('build'));
app.use(express.json());

app.get('/decks', applyCallback(getDecks));
app.get('/shuffled-decks', applyCallback(getShuffledDecks));
app.post('/results', applyCallback(saveScore));

app.listen(process.env.PORT || 3000);

function applyCallback(controller) {
  return (req, res) => {
    controller(config, req).then((data) => {
      res.send(data);
    });
  };
}
