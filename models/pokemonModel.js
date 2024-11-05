const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: { type: String, required: true, unique: true },
  baseExperience: { type: Number },
  types: [String],
  height: Number,
  sprites: String,
});

const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = Pokemon;
