const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true,
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        unit: { type: Number, required: true },
      },
    ],
    orders: [
      { type: mongoose.Schema.Types.ObjectId, ref: "order", required: true },
    ],
    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("customer", CustomerSchema);
