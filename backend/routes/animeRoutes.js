//route file for local anime get and post with mongodb
const express = require("express");
const mongoose = require("mongoose");

const multer = require("multer");

//creating the router object
const router = express.Router();

// for anime schema model
const Anime = require("../models/anime");
const UserAnime = require("../models/userAnime");

//middleware to authenticate user
const authenticateUser = require("../middleware/authMiddleware");
const User = require("../models/user");

//multer using disk storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//storing files to uploads folder
const upload = multer({ storage });

//get anime list
router.get("/animeList", async (req, res) => {
  try {
    //exclude userId field
    const animeList = await UserAnime.find({}, { _id: 0, userId: 0 });
    res.json(animeList);
  } catch (error) {
    console.error("error: ", error);
  }
});

//posting anime by manual user input
router.post(
  "/post",
  authenticateUser,
  upload.single("image"),
  async (req, res) => {
    console.log(req.user);
    try {
      //save to database
      const newAnime = new Anime({
        title: req.body.title,
        rate: req.body.rate,
        episode: req.body.episode,
        completed: req.body.completed,
        imagePath: req.file.path,
      });
      const savedAnime = await newAnime.save();
      res.json(savedAnime);
    } catch (error) {
      console.error("error: ", error);
    }
  }
);

//save to userAnime collection
router.post("/userAnimeSave", authenticateUser, async (req, res) => {
  try {
    console.log("animeRoutes userAnimeSave req.body: ", req.body);

    const { username, anime_mal_id } = req.body;

    const user = await User.findOne({ username });

    console.log("user: ", user);

    const newUserAnime = new UserAnime({
      userId: user._id,
      username: username,
      anime_mal_id,
    });

    await newUserAnime.save();
    res.json(newUserAnime);
  } catch (error) {
    res.json({ message: error });
  }
});

//save anime details in anime collection
router.post("/mal_post", async (req, res) => {
  try {
    const { mal_id, title, image_url } = req.body;

    const existingAnime = await Anime.findOne({ mal_id });

    if (existingAnime) {
      return res.json({ error: "Anime already exists in db" });
    }

    const newAnime = new Anime({
      mal_id,
      title,
      imagePath: image_url,
    });

    const savedAnime = await newAnime.save();

    res.status(201).json(savedAnime);
  } catch (error) {
    console.error("error: ", error);
  }
});

router.delete("/userAnimeDelete", authenticateUser, async (req, res) => {
  try {
    console.log("animeRoutes userAnimeDelete req.body: ", req.body);

    const { username, anime_mal_id } = req.body;

    const deleted = await UserAnime.deleteOne({
      username: username,
      anime_mal_id: anime_mal_id,
    });

    if (deleted) {
      res.json({ message: "Anime deleted from UserAnime Collection" });
    } else {
      res.json({ error: "Anime not found in user's list" });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/details", async (req, res) => {
  const malIds = req.query.mal_ids;

  try {
    const animeDetails = await Anime.find(
      { mal_id: { $in: malIds } },
      { _id: 0 }
    );
    res.json(animeDetails);
  } catch (error) {
    console.error("error: ", error);
  }
});

module.exports = router;
