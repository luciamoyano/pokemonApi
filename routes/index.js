const express = require("express");
const router = express.Router();

const PokemonController = require("../controllers/pokemonController");
const PokemonService = require("../services/pokemonService");
const PokemonInstance = new PokemonController(new PokemonService());

const multer = require("multer");
const pokemonModel = require("../models/pokemonModel");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //debemos crear la carpeta donde van los archivos
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    //fieldname es 'avatar'
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("index");
});

router.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.body, req.file);
  return res.json({
    error: false,
    file: req.file,
    body: req.body,
  });
});

/**Ejercicio: https://gist.github.com/doomling/1a0b7515fac87060acdadaa8cf53dcd1 */
router.post("/addPokemon", upload.single("image"), (req, res) => {
  PokemonInstance.addPokemon(req, res);
});

router.get("/pokemons", (req, res, next) => {
  PokemonInstance.getPokemons(req, res);
});

router.put("/modify/:name", (req, res, next) => {
  PokemonInstance.updatePokemon(req, res);
});

router.delete("/disable/:name", (req, res) => {
  PokemonInstance.disablePokemon(req, res);
});

module.exports = router;
