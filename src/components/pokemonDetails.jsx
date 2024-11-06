import React from 'react';

const PokemonDetails = ({ pokemon }) => {
  return (
    <div className='pokemon-card'>
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
  );
};

export default PokemonDetails;
