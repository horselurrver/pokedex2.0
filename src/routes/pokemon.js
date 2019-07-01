let express = require('express');
let route = express.Router();

// query string
route.get('/pokemon', (req, res, next) => {
  if (req.query.name) {
    res.send(`You have requested the pokemon named ${req.query.name}`);
  } else {
    res.send('You have requested a pokemon');
  }
});

// params on request object
route.get('/pokemon/:name', (req, res, next) => {
  res.send(`You have requested the pokemon named ${req.params.name}`);
});

route.get('/error', (req, res, next) => {
  throw new Error;
});
module.exports = route;
