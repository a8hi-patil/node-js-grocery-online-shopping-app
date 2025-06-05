const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    banner: String,
    type: String,
    unit: Number,
    price: Number,
    available: Boolean,
    supplier: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
