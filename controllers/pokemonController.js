const Pokemon = require('../models/pokemonModel');
const axios = require('axios');

const getPokemonData = async (req, res, next) => {
  const { name } = req.params;
  try {
    let pokemon = await Pokemon.findOne({ name });
    // console.log('Pokemon: ', pokemon);
    // console.log('Query:', pokemon.getQuery());

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
      // console.log(`Found Pokémon:`, pokemon);
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

const createPokemon = async (req, res, next) => {
  const { name, types, height, base_experience, sprite } = req.body; // Destructure data from the request body

  try {
    // Check if the Pokémon already exists in the database
    const existingPokemon = await Pokemon.findOne({ name });
    if (existingPokemon) {
      return next({
        log: 'Error in pokemonController.createPokemon',
        status: 400,
        message: { err: `Pokémon with name ${name} already exists` },
      });
    }

    // Create a new Pokémon object
    const newPokemon = new Pokemon({
      name,
      types: types || [], // Default to an empty array if no types provided
      height: height || 0, // Default to 0 if no height provided
      base_experience: base_experience || 0, // Default to 0 if no base_experience provided
      sprite: sprite || null, // Default to null if no sprite provided
    });

    // Save the new Pokémon to the database
    await newPokemon.save();
    res.locals.newPokemon = newPokemon;
    return next();
  } catch (error) {
    console.error(error);
    return next({
      log: 'Error in pokemonController.createPokemon',
      status: 500,
      message: { err: 'An error occurred while creating the Pokémon', error },
    });
  }
};

module.exports = {
  getPokemonData,
  createPokemon,
};
