const express = require("express");

//creating router object
const router = express.Router();

const UserAnime = require("../models/userAnime");
const User = require("../models/user");
const Anime = require("../models/anime");

//returns the user profile info
router.get("/:username/profile", async (req, res) => {
  try {
    const username = req.params.username;

    //get the user profile info from database
    const userProfile = await User.findOne({ username }).select(
      "profileImage backgroundImage bio"
    );
    res.json(userProfile);
  } catch (error) {
    console.error("error: ", error);
  }
});

//returns the anime list details of the user (title and image path)
router.get("/:username/animeListWithDetails", async (req, res) => {
  console.log("/api/user/:username/animelistwithdetails routes ran");
  try {
    const username = req.params.username;

    //check if user exists
    const userExists = await User.exists({ username });

    //if user doesn't exist return error
    if (!userExists) {
      console.log("User does not exist");
      return res.json({ error: "User does not exist" });
    }

    //get the anime list of the user
    const userAnimeEntries = await UserAnime.find({ username }).select(
      "anime_mal_id"
    );


    //extract only anime_mal_id using mapping
    const animeIds = userAnimeEntries.map((entry) => entry.anime_mal_id);

    const animeListWithDetails = await Anime.find({mal_id: {$in: animeIds}}).select("mal_id title imagePath");

    console.log("animeListWithDetails: ", animeListWithDetails);

    res.json(
      animeListWithDetails
    );
  } catch (error) {
    console.error("error: ", error);
  }
});

module.exports = router;
