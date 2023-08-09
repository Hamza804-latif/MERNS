const mongoose = require("mongoose");

let RegisterScehma = new mongoose.Schema({
  image: String,
  name: String,
  email: String,
  password: String,
});

let ProductSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: String,
  stock: String,
});

exports.registerModel = mongoose.model("register", RegisterScehma);
exports.ProductModel = mongoose.model("products", ProductSchema);
