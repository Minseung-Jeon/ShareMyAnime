const express = require("express");
const bcrypt = require("bcryptjs");

//json web token
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const jwtSecret = process.env.JWT_SECRET;

//creating router object
const router = express.Router();
const User = require("../models/user");

router.post("/createAccount", async (req, res) => {
  const { email, username, password} = req.body;
  console.log("req body", req.body);

  try {
    //check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.json({
        message: "Email already registered. Try different Email.",
      });
    }

    //check if username already exists
    user = await User.findOne({ username });
    if (user) {
      return res.json({
        message: "Username already taken. Try different Username.",
      });
    }

    //if email and username is unique then create a new user
    user = new User({
      email,
      username,
      password,
    });

    await user.save();

    res
      .status(200)
      .json({ message: "User created successfully. Welcome Aboard!" });
  } catch (error) {
    console.error("error: ", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists with email
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User not found. Please register first.");
    }

    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Incorrect password. Please try again.");
    }

    //send payload to frontend
    const payload = {
      user: {
        username: user.username,
      },
    };

    //sending the jwt to the frontend
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("error: ", error);
  }
});

module.exports = router;
