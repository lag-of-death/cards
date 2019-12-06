const express = require('express');
const { getDeck } = require('./server/controllers');

const app = express();

function applyCallback(controller) {
  return (req, res) => {
    controller(req).then(({ data }) => {
      res.send(data);
    });
  };
}

app.use(express.static('build'));

app.get('/deck', applyCallback(getDeck));

app.listen(process.env.PORT || 3000);
