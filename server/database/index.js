const mongoose = require("mongoose");

async function DatabaseConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (error) {
    console.log("error in database coonnection", error);
  }
}

module.exports = DatabaseConnection;
