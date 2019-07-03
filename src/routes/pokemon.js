let express = require('express');
let route = express.Router();
// allow for file reading
let fs = require("fs");

// load pokemon names and image urls from local json file
function loadPokemonJSON() {
  var contents = fs.readFileSync(__dirname + "/pokemon.json");
  var jsonContent = JSON.parse(contents);
  var pokemon = jsonContent.pokemon;
  return pokemon;
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
  res.render('pokemon');

});

route.get('/error', (req, res, next) => {
  throw new Error;
});
module.exports = route;
