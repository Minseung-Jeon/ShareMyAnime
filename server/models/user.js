const mongoose = require("mongoose");

const UserAnime = require("./userAnime");

//importing bcrypt for hashing
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  profileImage: { type: String, default: "/images/erased.jpg" },
  backgroundImage: { type: String, default: "/images/erased.jpg" },
  bio: { type: String, default: "No bio yet ;)" },
});

//pre codes are triggered only when triggered by web app not mongodb atlas
//runs this chunk before save operation
userSchema.pre("save", async function (next) {
  try {
    //for password hashing
    const salt = await bcrypt.genSalt(10);
    console.log("salt:", salt);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("password:", this.password);

    next();
  } catch (error) {
    console.log(error);
  }
});

//removes related userAnime data before removing user
userSchema.pre("remove", async function (next) {
  try {
    await UserAnime.deleteMany({ user: this._id });
    console.log("UserAnime data removed");
    next();
  } catch (error) {
    console.log(error);
  }
});

//setting the collection name as user plural form
const User = mongoose.model("user", userSchema);
module.exports = User;
