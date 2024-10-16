const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  mal_id: {type: Number, required: true},
  title: { type: String, required: true },
  imagePath: { type: String, required: true },
});

Anime = mongoose.model("Anime", animeSchema);

 module.exports = Anime