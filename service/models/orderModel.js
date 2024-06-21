const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
    transactionId: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ["success", "failed"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);