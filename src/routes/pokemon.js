let express = require('express');
let route = express.Router();
let mongoose = require('mongoose');
let PokemonModel = require('../models/pokemon-model.js');
// allow for file reading
let fs = require("fs");

// load pokemon names and image urls from local json file
function loadPokemonJSON() {
  var contents = fs.readFileSync(__dirname + "/pokemon.json");
  var jsonContent = JSON.parse(contents);
  var pokemon = jsonContent.pokemon;
  return pokemon;
}

function capitalize(name) {
  result = ''
  result = result + name.charAt(0).toUpperCase();
  for (let i = 1; i < name.length; i++) {
    if (name.charAt(i - 1) === '-') {
      result = result + name.charAt(i).toUpperCase();
    } else {
      result = result + name.charAt(i);
    }
  }
  return result;
}

const pokes = loadPokemonJSON();
// query string
route.get('/', (req, res, next) => {
  res.render('index', {
    pokemon: pokes,
    helpers: {
      formatName: function(name) {
        result = ''
        result = result + name.charAt(0).toUpperCase();
        for (let i = 1; i < name.length; i++) {
          if (name.charAt(i - 1) === '-') {
            result = result + name.charAt(i).toUpperCase();
          } else {
            result = result + name.charAt(i);
          }
        }
        return result;
      }
    }
  });
});

// params on request object
route.get('/pokemon/:name', (req, res, next) => {
  let name = req.params.name;
  name = name.toLowerCase();
  //res.send('The name is ' + name);
  PokemonModel.find({ name: name}, function(err, pokemon) {
    if (err) {
      return console.error(err);
    }
    res.render('pokemon', {
      name: capitalize(name),
      url: pokemon[0]['url']
    });
  });

});

route.get('/error', (req, res, next) => {
  throw new Error;
});
module.exports = route;
