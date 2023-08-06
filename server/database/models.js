const mongoose = require("mongoose");

let RegisterScehma = new mongoose.Schema({
  image: String,
  name: String,
  email: String,
  password: String,
});

exports.registerModel = mongoose.model("register", RegisterScehma);
