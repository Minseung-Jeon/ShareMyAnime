const express = require("express");
const cors = require("cors");
//for favicon.ico
const path = require("path");
const app = express();
app.use(cors());

//interpret incoming JSON string in request body to Javascript object
//essentially translates raw JSON data into format that backend (express) could understand
app.use(express.json());

//import mongodb
//model name is Anime
const connectDB = require("./db.js");

//connect to database
connectDB();

//import user routes
const userRoutes = require("./routes/userRoutes.js");
app.use("/api/user", userRoutes);

//import anime routes
const animeRoutes = require("./routes/animeRoutes.js");
app.use("/api/anime", animeRoutes);

//import auth routes
const authRoutes = require("./routes/authRoutes.js");
app.use("/api", authRoutes);

//to read the file from the uploads folder
app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname, "client/dist")));

app.listen(5000, () => {
  console.log(`server listening on port 5000`);
  console.log(path.join(__dirname, "public"));
});

//req: contains information about the incoming HTTP request
//res: send HTTP response back to the client
app.get("/api/get", (req, res) => {
  res.send("Hello from the server");
});
