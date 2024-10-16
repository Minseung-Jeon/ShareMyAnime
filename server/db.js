//cannot mix with MongoClient!!!
const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(url);

    console.log("successfully connected to the database");
  } catch (error) {
    console.error("error connecting to the database: ", error);
  }
}

module.exports = connectDB;
