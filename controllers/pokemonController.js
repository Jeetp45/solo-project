const Pokemon = require('../models/pokemonModel');
const axios = require('axios');

const getPokemonData = async (req, res, next) => {
  const { name } = req.params;
  try {
    let pokemon = await Pokemon.findOne({ name });

    if (!pokemon) {
      // Fetching data from external API
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      if (!response.data) {
        return next({
          log: 'Error in pokemonController.getPokemonData',
          status: 404,
          message: { err: `Pokémon ${name} not found in API` },
        });
      }
      const { types, height, base_experience, sprites } = response.data;

      pokemon = new Pokemon({
        name: response.data.name,
        types: types ? types.map((type) => type.type.name) : [],
        height: height || 0,
        base_experience: base_experience || 0,
        sprite: sprites ? sprites.front_default : null,
      });

      await pokemon.save();
      res.locals.pokemon = pokemon;
      return next();
    } else {
      res.locals.pokemon = pokemon; // If already in DB
      return next();
    }
  } catch (error) {
    console.error(error); // Log the full error for better debugging
    return next({
      log: 'Error in pokemonController.getPokemonData',
      status: 500,
      message: { err: 'An error occurred while getting Pokémon data', error },
    });
  }
};

module.exports = {
  getPokemonData,
};
