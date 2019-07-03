// require express
let express = require('express');
// require express handlebars
let exphbs  = require('express-handlebars');
// set up the express application
let app = express();
// allow sending of files
let path = require('path');
// parse JSON being sent in
let bodyParser = require('body-parser');

// set up handlebars engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// set up body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let pokemonRoute = require('./routes/pokemon');
let pokemonSaveRoute = require('./routes/savepokemon.js');

// register the pokemon route
app.use(pokemonRoute);
app.use(pokemonSaveRoute);
// use public for static resources like html and images
app.use(express.static('public'));
// handle 404 - file not found
app.use((req, res, next) => {
  res.status(404).send('We think you are lost!');
});
// handle 500 - internal error
app.use((err, req, res, next) => {
  console.log(err.stack);
  // res.sendFile(path.join(__dirname, '../public/500.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Server has started at ${PORT}`);
});
