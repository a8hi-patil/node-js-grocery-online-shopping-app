const mongoose = require("mongoose");
const { DB_URL } = require("../config");
const connectToDatabase = async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch(() => {
      console.error("Unable to connect with Database");
      process.exit(1);
    });
};

module.exports = connectToDatabase;
