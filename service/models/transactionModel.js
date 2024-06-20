const mongoose = require('mongoose');

const transStatusEnum = ['SUCCESS', 'FAILED', 'PENDING'];

const transactionSchema = new mongoose.Schema({
  transStartTime: {
    type: Date,
    default: Date.now,
  },
  transEndTime: {
    type: Date,
  },
  transStatus: {
    type: String,
    enum: transStatusEnum,
    required: true,
  },
  transByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  refId: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  method: {
    type: String,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;