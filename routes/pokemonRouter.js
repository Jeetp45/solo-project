const express = require('express');
const router = express.Router();
const { getPokemonData } = require('../controllers/pokemonController');

router.get('/pokemon/:name', getPokemonData, (req, res) => {
  return res.status(201).json(res.locals.pokemon);
});

module.exports = router;
