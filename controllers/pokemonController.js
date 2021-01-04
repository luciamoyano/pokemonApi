const axios = require("axios");

class PokemonController {
  constructor(pokemonService) {
    this.pokemonService = pokemonService;
  }
  async addPokemon(req, res) {
    const { name } = req.body;
    const { path } = req.file;
    console.log(name);
    console.log(path);
    if (name && path) {
      try {
        const data = {
          name: name,
          image: path,
        };
        const response = await this.pokemonService.addPokemon(data);
        console.log(response);
        res.status(200).send("pokemon added succesfully");
      } catch (error) {
        console.log(error);
        res.status(500).send("couldn't add pokemon");
      }
    } else {
      res.status(400).send("incomplete data");
    }
  }

  async getPokemons(req, res) {
    const page = parseInt(req.query.page);
    try {
      const pokemons = await this.pokemonService.getPokemons(page);
      res.status(200).json(pokemons);
    } catch (error) {
      console.log(error);
      res.status(500).send("couldn't get pokemons");
    }
  }

  async updatePokemon(req, res) {
    const { name } = req.params;
    if (name) {
      try {
        const pokeApi = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const { height, id, weight, types } = pokeApi.data;
        const type = types[0].type;
        const data = {
          pokeId: id,
          height: height,
          weight: weight,
          type: type,
        };
        const response = await this.pokemonService.updatePokemon(data, name);
        console.log(response);
        res.status(200).send("pokemon updated correctly");
      } catch (error) {
        res.status(500).send("couldn't update pokemon");
      }
    } else {
      res.status(400).send("no name or id provided");
    }
  }

  async disablePokemon(req, res) {
    const { name } = req.params;
    if (name) {
      try {
        const response = await this.pokemonService.disablePokemon(name);
        console.log(response);
        res.status(200).send("pokemon disabled");
      } catch (error) {
        console.log(error);
        res.status(500).send("couldn't disable pokemon");
      }
    } else {
      res.status(400).send("no name or id provided");
    }
  }
}

module.exports = PokemonController;
