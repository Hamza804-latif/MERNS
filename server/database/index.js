const mongoose = require("mongoose");

async function DatabaseConnection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/MyMernDatabase");
    console.log("database connected");
  } catch (error) {
    console.log("error in database coonnection", error);
  }
}

module.exports = DatabaseConnection;
