const express = require('express');
const { getDecks, getShuffledDecks, saveScore } = require('./server/controllers');

const app = express();

function applyCallback(controller) {
  return (req, res) => {
    controller(req).then((data) => {
      res.send(data);
    });
  };
}

app.use(express.static('build'));

app.use(express.json());

app.get('/decks', applyCallback(getDecks));
app.get('/shuffled-decks', applyCallback(getShuffledDecks));
app.post('/results', applyCallback(saveScore));

app.listen(process.env.PORT || 3000);
