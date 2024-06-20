import React, { useState } from "react";
import TransactionHandler from "../../handler/TransactionHandler";
import axios from "axios";
import { Dialog } from "../../components";
import { useSelector } from "react-redux";

const TransactionModal = ({ modalState, onClose, amount, products }) => {
  const { initiateTransactionHandler, confirmTransactionHandler } =
    TransactionHandler();

  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const paymentHandler = async ({ amount, receiptId }) => {
    const orderUrl = `${process.env.REACT_APP_API_BASE_URL}/razorpay/order`;
    const response = await axios.post(orderUrl, { amount, receiptId });
    const { data } = response;
    const options = {
      key: process.env.REACT_APP_PUBLIC_RAZOR_PAY_KEY_ID,
      name: "Workers Hive",
      description: "Create a secure payment!",
      order_id: data.id,
      handler: async (response) => {
        try {
          console.log(response);
          const paymentId = response.razorpay_payment_id;
          const url = `${process.env.REACT_APP_API_BASE_URL}/razorpay/capturepayment`;
          await axios
            .post(url, { paymentId, amount, receiptId })
            .then(() => {
              console.log("Transaction successful!");
              confirmTransactionHandler(receiptId, "SUCCESS")
                .then((res) => {
                  console.log(res);
                  setLoading(false);
                  //   onSuccess();
                  onClose();
                  // getUserAppointmentsHandler();
                })
                .catch((err) => {
                  console.log(err);
                  onClose();
                });
            })
            .catch((err) => {
              console.log(err);
              onClose();
            });
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const buttonHandler = () => {
    const transByUserId = user._id;
    // const transForAppointment = 12345;

    setLoading(true);
    initiateTransactionHandler({
      transByUserId,
      amount,
    })
      .then((res) => {
        const { amount, _id } = res.data.data;
        paymentHandler({
          amount,
          receiptId: _id,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Dialog
      isOpen={true}
      onClose={onClose}
      className="h-full lg:h-auto overflow-scroll"
      contentClassName={`w-full bg-white lg:max-w-xl sm:rounded-lg p-5`}
      overlayClassName="backdrop-blur"
      closable={true}
    >
      <div className="flex flex-col w-full space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Transaction Details
        </h2>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">Amount</label>
          <p className="text-lg font-semibold text-gray-800">{2345}</p>
        </div>
        {/* Add more transaction details as needed */}
        <button
          className="flex justify-center items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={buttonHandler}
          disabled={loading}
        >
          {loading ? "loading..." : "Proceed with payment"}
        </button>
      </div>
    </Dialog>
  );
};

export default TransactionModal;
