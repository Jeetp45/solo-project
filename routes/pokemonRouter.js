const express = require('express');
const router = express.Router();
// const { getPokemonData } = require('../controllers/pokemonController');
const pokemonController = require('../controllers/pokemonController');

router.get('/pokemon/:name', pokemonController.getPokemonData, (req, res) => {
  return res.status(201).json(res.locals.pokemon);
});

router.post('/pokemon', pokemonController.createPokemon, (req, res) => {
  return res.status(201).json(res.locals.newPokemon);
});

module.exports = router;
