let mongoose = require('mongoose');

mongoose.connect('mongodb://amy:MNTYcns6@ds229295.mlab.com:29295/bob', {useNewUrlParser: true});

let PokemonSchema = new mongoose.Schema({
  name: String,
  url: String,
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
