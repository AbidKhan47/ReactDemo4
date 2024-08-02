import './App.css'
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [pokemonName, setPokemonName] =useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
        name: pokemonName,
        species:"",
        img:"",
        hp:"", 
        attack:"",
        defense:"",
        type:"",
  })
  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=> {
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
      console.log(response.data.species.name, response.data.sprites.front_default, response.data.stats[0].base_stat)
    }) 
  }

  return (
    <>
      <div className="App border"> 
        <div className="TitleSection">  
              <h2>Pokemon Stats</h2>
              <input value={pokemonName} onChange={(event) => {setPokemonName(event.target.value)}}/>
              <button onClick={searchPokemon}>Search Pokemon</button>  
        </div>
          <div className="DisplaySection">{!pokemonChosen ? (<h1>Please choose a Pokemon</h1>) 
            : (<h1>{pokemon.name}</h1>)}
                <img src={pokemon.img} />
                <h3>Species: {pokemon.species}</h3>
                <h3>Type: {pokemon.type}</h3>
                <h4>Hp: {pokemon.hp}</h4>
                <h4>Attack: {pokemon.attack}</h4>
                <h4>Defense: {pokemon.defense}</h4>
          </div> 
      </div>
    </>
  )
}

export default App 
