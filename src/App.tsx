import './App.css'
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: pokemonName,
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemon({
        name: pokemonName,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
      setPokemonName('');
    });
  };

  const getRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1; 
    axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then((response) => {
      setPokemon({
        name: response.data.name,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="pokedex bg-red-600 border-4 border-red-900 rounded-3xl p-10 shadow-2xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-yellow-400 mb-6 tracking-wide">
          Pokédex
        </h2>

        <div className="search-container mb-8 flex justify-center">
          <input
            className="p-3 rounded-full bg-gray-100 text-black w-64 focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-md"
            value={pokemonName}
            onChange={(event) => setPokemonName(event.target.value)}
            placeholder="Enter Pokémon name"
          />
          <button
            className="ml-4 p-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition duration-300 text-white shadow-md"
            onClick={searchPokemon}
          >
            Search
          </button>
          <button
            className="ml-4 p-3 rounded-full bg-green-500 hover:bg-green-600 transition duration-300 text-white shadow-md"
            onClick={getRandomPokemon}
          >
            Random Pokémon
          </button>
        </div>

        <div className="DisplaySection mt-6">
          {!pokemonChosen ? (
            <h1 className="text-2xl font-semibold">Please choose a Pokémon</h1>
          ) : (
            <div className="pokemon-info bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h1 className="text-3xl font-bold mb-4 capitalize">{pokemon.name}</h1>
              <img
                src={pokemon.img}
                alt={pokemon.name}
                className="w-32 h-32 mx-auto mb-6"
              />
              <div className="stats bg-gray-700 rounded-lg p-4 shadow-inner">
                <h3 className="text-lg mb-2">
                  <span className="font-semibold text-yellow-300">Species:</span> {pokemon.species}
                </h3>
                <h3 className="text-lg mb-2">
                  <span className="font-semibold text-yellow-300">Type:</span> {pokemon.type}
                </h3>
                <h4 className="text-md mb-1">
                  <span className="font-semibold text-yellow-300">HP:</span> {pokemon.hp}
                </h4>
                <h4 className="text-md mb-1">
                  <span className="font-semibold text-yellow-300">Attack:</span> {pokemon.attack}
                </h4>
                <h4 className="text-md mb-1">
                  <span className="font-semibold text-yellow-300">Defense:</span> {pokemon.defense}
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
