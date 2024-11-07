const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: { type: String, required: true, unique: true },
  base_experience: Number,
  types: [String],
  height: Number,
  sprite: String,
  past_types: [String],
});

const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = Pokemon;
