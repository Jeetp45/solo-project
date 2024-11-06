import React from 'react';
import { useState, useEffect } from 'react';
const axios = require('axios');
import PokemonInput from './pokemonInput';
import PokemonDetails from './pokemonDetails';
import '/pokemonInfo.css';

const PokemonInfo = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState('');
  const [error, setError] = useState('');

  const getPokemonData = async () => {
    if (!pokemonName) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pokemon/${pokemonName.toLowerCase()}`
      );
      //   console.log('Response: ', response.data);
      //   console.log('Sprite: ', response.data.sprite);
      if (!response.data || !response.data.sprite) {
        setError('No valid sprite found for this Pokémon');
        return;
      }
      setPokemons((prevPokemons) => [
        ...prevPokemons,
        {
          name: response.data.name,
          types: response.data.types,
          height: response.data.height || 0,
          base_experience: response.data.base_experience || 0,
          sprite: response.data.sprite,
        },
      ]);
    } catch (err) {
      setError('Pokemon not found, or error fetching data');
      console.error(err);
    }
  };

  return (
    <div>
      <PokemonInput
        pokemonName={pokemonName}
        setPokemonName={setPokemonName}
        getPokemonData={getPokemonData}
      />
      <div className='pokemon-container'>
        {pokemons.length > 0 ? (
          pokemons.map((pokemon, index) => (
            <PokemonDetails key={index} pokemon={pokemon} />
          ))
        ) : (
          <p>Pokemon Information will display below</p>
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;
