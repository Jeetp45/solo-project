import React from 'react';
import { useState, useEffect } from 'react';
const axios = require('axios');

const PokemonInfo = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [error, setError] = useState('');

  const getPokemonData = async () => {
    if (!pokemonName) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pokemon/${pokemonName.toLowerCase()}`
      );
      console.log('Response: ', response.data);
      console.log('Sprite: ', response.data.sprite);
      if (!response.data || !response.data.sprite) {
        setError('No valid sprite found for this Pokémon');
        return;
      }
      setPokemon({
        name: response.data.name,
        types: response.data.types,
        height: response.data.height || 0,
        base_experience: response.data.base_experience || 0,
        sprite: response.data.sprite,
      });
    } catch (err) {
      setError('Pokemon not found, or error fetching data');
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Enter Pokemon Name'
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={getPokemonData}>Get Pokemon</button>
      </div>
      {pokemon ? (
        <div>
          <h2>{pokemon.name.toUpperCase()}</h2>
          {pokemon.sprite && (
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              style={{ width: '200px', height: '200px' }}
            />
          )}
          <p>
            <strong>Types:</strong> {pokemon.types.join(', ')}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height} decimeters
          </p>
          <p>
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </p>
        </div>
      ) : (
        <p>Enter a Pokémon name to get information</p> // Fallback message
      )}
    </div>
  );
};

export default PokemonInfo;
