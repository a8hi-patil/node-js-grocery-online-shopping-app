const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    street: String,
    postalCode: String,
    country: String,
    city: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("address", AddressSchema);
