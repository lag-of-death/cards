const express = require('express');
const { getDecks, getShuffledDecks } = require('./server/controllers');

const app = express();

function applyCallback(controller) {
  return (req, res) => {
    controller(req).then((data) => {
      res.send(data);
    });
  };
}

app.use(express.static('build'));

app.get('/decks', applyCallback(getDecks));
app.get('/shuffled-decks', applyCallback(getShuffledDecks));

app.listen(process.env.PORT || 3000);
