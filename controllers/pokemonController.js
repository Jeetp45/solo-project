const Pokemon = require('../models/pokemonModel');
const axios = require('axios');

const getPokemonData = async (req, res) => {
  const { name } = req.params;

  try {
    let pokemon = await Pokemon.findOne({ name });

    if (!pokemon) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const { types, height, base_experience, sprites } = response.data;

      pokemon = new Pokemon({
        name,
        types: types.map((type) => type.type.name),
        height,
        base_experience,
        sprite: sprites.front_default,
      });
      res.locals.pokemon = pokemon;
      await pokemon.save();
      return next();
    }
  } catch {
    return next({
      log: 'Error in pokemonController.getPokemonData',
      status: 400,
      message: { err: 'An error occurred while getting pokemon data' },
    });
  }
};

module.exports = {
  getPokemonData,
};
