const mongoose = require("mongoose");


const cartSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  cart: [
    {
      productId: Number,
      quantity: Number, 
    },
  ],
});

module.exports = mongoose.model('Carts', cartSchema);