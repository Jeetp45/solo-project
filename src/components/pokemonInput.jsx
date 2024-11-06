import React from 'react';

const PokemonInput = ({ pokemonName, setPokemonName, getPokemonData }) => {
  return (
    <div>
      <input
        type='text'
        placeholder='Enter Pokemon Name'
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button onClick={getPokemonData}>Get Pokemon</button>
    </div>
  );
};

export default PokemonInput;
