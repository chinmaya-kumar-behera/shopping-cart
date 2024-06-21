const Transaction = require("../models/transactionModel");
const Razorpay = require("razorpay");
const request = require('request');
const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");

const createTransaction = async (transByUserId, amount,) => {
  try {
    const result = await Transaction.create({
      transByUserId,
      amount,
      transStartTime: new Date(),
      transStatus: "PENDING",
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const initiateTransaction = async (req, res) => {
  console.log("initial transaction")
  try {
    const { transByUserId, amount } = req.body;
    
    if (!transByUserId || !amount || isNaN(amount) || amount <= 0) {
      throw new Error("Invalid userId or amount");
    }

    const transaction = await createTransaction(transByUserId, amount);
    res.status(200).json({ mesage: "payment initiated!", data: transaction });
      
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

const RAZOR_PAY_KEY_ID = process.env.RAZOR_PAY_KEY_ID;
const RAZOR_PAY_KEY_SECRET = process.env.RAZOR_PAY_KEY_SECRET;

const instance = new Razorpay({
  key_id: RAZOR_PAY_KEY_ID,
  key_secret: RAZOR_PAY_KEY_SECRET,
});

const covertRupeesToPaise = (rupees) => {
  if (Number.isInteger(rupees)) {
    return rupees * 100;
  } else {
    return parseFloat(rupees) * 100;
  }
};

const createRazorpayOrder = async (req, res) => {
  const { amount, receiptId } = req.body;
  try {
    const amountInPaisa = covertRupeesToPaise(amount);

    const options = {
      amount: amountInPaisa,
      currency: "INR",
      receipt: receiptId,
      payment_capture: 0,
    };

    instance.orders.create(options, async (err, order) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      const transaction = await Transaction.findById(receiptId);
      transaction.refId = order.id;
      transaction.save();
      return res.status(200).json(order);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

const captureRazorpayPayment = async (req, res) => {
  const { paymentId, amount, receiptId } = req.body;

  try {
    const amountInPaisa = covertRupeesToPaise(amount);

    return request(
      {
        method: "POST",
        url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${paymentId}/capture`,
        form: {
          amount: amountInPaisa,
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }

        const paymentId = JSON.parse(body).id;
        const method = JSON.parse(body).method;
        await Transaction.findByIdAndUpdate(receiptId, { paymentId, method });
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

const confirmTransactionAPI = async (req, res) => {
  const { transactionId, status, products, cartId } = req.body;
  try {
    if (!transactionId || (status !== "SUCCESS" && status !== "FAILED")) {
      throw new Error("Invalid transactionId or status");
    }

    const updatedTransaction = await confirmTransaction(transactionId, status, products, cartId);

    res.status(200).json({ success: true, transaction: updatedTransaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const confirmTransaction = async (transactionId, status, products, cartId) => {
  try {
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const userId = transaction.transByUserId;
    const status = 'success';
    const orderDetail = await orderModel.create({ transactionId, userId, products, status });

    await cartModel.findByIdAndDelete(cartId);

    transaction.transStatus = status;
    transaction.transEndTime = new Date();

    await transaction.save();

    return transaction;
  } catch (error) {
    throw new Error(`Error confirming transaction: ${error.message}`);
  }
};


module.exports = { initiateTransaction, createRazorpayOrder, captureRazorpayPayment, confirmTransactionAPI };