const mongoose = require("mongoose");

//import User model for objectid
const User = require("./user");

const userAnimeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
  anime_mal_id: {
    type: Number,
    required: true,
  },
});

const UserAnime = mongoose.model("UserAnime", userAnimeSchema);

module.exports = UserAnime;
