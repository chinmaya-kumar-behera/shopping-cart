const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [
    {
      id: { type: Number },
      quantity: { type: Number },
    },
  ],
  transactionId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Orders", orderSchema);