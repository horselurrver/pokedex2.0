let PokemonModel = require('../models/pokemon-model.js');
let express = require('express');
let router = express.Router();

// create a new pokemon
router.post('/newpokemon', (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send('Request body is missing');
  }
  let model = new PokemonModel({
    name: req.body.name,
    url: req.body.url,
  });
  model.save()
    .then(doc => {
      if(! doc || doc.length === 0) {
        res.status(500).send(doc);
      }

      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });

});

module.exports = router;
