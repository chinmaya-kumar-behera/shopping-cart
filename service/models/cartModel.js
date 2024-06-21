const mongoose = require("mongoose");


const cartSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model('Carts', cartSchema);