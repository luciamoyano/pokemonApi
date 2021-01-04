const Pokemon = require("../models/pokemonModel");

class PokemonService {
  addPokemon(data) {
    const newPokemon = new Pokemon(data);
    return newPokemon.save();
  }

  getPokemons(page) {
    const limit = 10;
    const offset = limit * (page - 1);
    const pokemons = Pokemon.find().skip(offset).limit(limit).exec();
    return pokemons;
  }

  updatePokemon(data, name) {
    const query = Pokemon.updateOne({ name: name }, data).exec();
    return query;
  }

  disablePokemon(name) {
    const query = Pokemon.updateOne({ name: name }, { disabled: true }).exec();
    return query;
  }
}

module.exports = PokemonService;
