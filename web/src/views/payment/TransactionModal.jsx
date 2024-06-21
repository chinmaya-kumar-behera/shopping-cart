import React, { useState } from "react";
import TransactionHandler from "../../handler/TransactionHandler";
import axios from "axios";
import { Dialog } from "../../components";
import { useSelector } from "react-redux";
import { useTheme } from "../../hooks";
import NavigationHandler from "../../handler/NavigationHandler";

const TransactionModal = ({ modalState, onClose, amount, products , cartId }) => {
  const { initiateTransactionHandler, confirmTransactionHandler } = TransactionHandler();
  const { darkMode } = useTheme();
  const { navigateToOrderPage } = NavigationHandler();

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
              const productIds = products.map(item => { return { productId: item.productId._id, quantity: item.quantity } })
              confirmTransactionHandler({ transactionId: receiptId, status: "SUCCESS", products: productIds, cartId})
                .then((res) => {
                  console.log(res);
                  setLoading(false);
                  //onSuccess();
                  onClose();
                  // getUserAppointmentsHandler();
                  navigateToOrderPage();
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
      contentClassName={`w-full ${
        darkMode ? "bg-gray-500 bg-opacity-30" : "bg-white"
      } lg:max-w-xl sm:rounded-lg p-5`}
      overlayClassName="backdrop-blur"
      closable={true}
    >
      <div className="flex flex-col w-full space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Payment Confirmation
        </h2>

        <div className="space-y-2">
          {products.map(({ productId, quantity }, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                darkMode ? "bg-gray-500 bg-opacity-30" : "bg-white"
              } p-2 rounded-md`}
            >
              <div className="w-10">
                <img
                  className="w-full"
                  src={productId.image}
                  alt={productId.title}
                />
              </div>
              <div className="w-full">
                <h3 className="text-sm font-semibold">{productId.title}</h3>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-xs">
                      Quantity : <strong>{quantity}</strong>
                    </p>
                    <h4>
                      Price <strong>${productId.price}</strong>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end">
          <h4>
            SubTotal <strong>${amount}</strong>
          </h4>
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
