import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductsHandler from "../handler/ProductsHandler";
import { FiMinus, FiPlus } from "react-icons/fi";
import TransactionModal from "../views/payment/TransactionModal";
import moment from "moment";

const CartCard = ({ item, updateCartItem, removeFromCart }) => {
  const { _id, image, title, price, category, description, quantity } = item;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    updateCartItem(_id, newQuantity);
  };

  return (
    <div className="flex items-center border-b border-gray-200 p-5">
      <div className="flex-shrink-0 w-40">
        <img src={image} alt={title} className="w-full h-auto" />
      </div>
      <div className="ml-6 flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-sm text-gray-500">Category: {category}</p>
        <p className="text-sm text-gray-500">Price: ${price}</p>
        <div className="flex gap-10 items-center">
          <div className="flex items-center mt-2 gap-2">
            <button
              className="bg-gray-200 text-gray-700 p-1.5 rounded-full"
              onClick={() => handleQuantityChange(-1)}
            >
              <FiMinus className="text-sm" />
            </button>
            <span className="text-2xl">{quantity}</span>
            <button
              className="bg-gray-200 text-gray-700 p-1.5 rounded-full"
              onClick={() => handleQuantityChange(1)}
            >
              <FiPlus className="text-sm" />
            </button>
          </div>
          <button
            className="mt-2 text-white bg-red-500 hover:bg-red-400 px-5 p-2 rounded-md focus:outline-none transition-all duration-300"
            onClick={() => removeFromCart(_id)}
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const {
    getCartByUserIdHandler,
    updateCartItemHandler,
    removeCartItemHandler,
  } = ProductsHandler();
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [transactionModal, setTransactionModal] = useState(false);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    if (user?._id) {
      getCartByUserIdHandler({ userId: user._id })
        .then((res) => {
          if (Boolean(res.data.data)) {
            setCartId(res.data.data._id);
            setCartData(res.data.data.cart);
            calculateTotals(res.data.data.cart);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?._id]);

  const calculateTotals = (cartItems) => {
    const itemsCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const itemsPrice = cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
    setTotalItems(itemsCount);
    setTotalPrice(itemsPrice);
  };

  const updateCartItem = (productId, newQuantity) => {
    const updatedCart = cartData.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartData(updatedCart);
    updateCartItemHandler({ productId, quantity: newQuantity });
    calculateTotals(updatedCart);
  };

  const removeFromCart = (productId) => {
    removeCartItemHandler(productId);
    const updatedCart = cartData.filter((item) => item._id !== productId);
    setCartData(updatedCart);
    calculateTotals(updatedCart);
  };

  return (
    <div className="p-10">
      <div className="">
        <h2 className="text-xl font-bold">Cart items</h2>
      </div>
      {loading ? (
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {cartData.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600">Your cart is empty.</p>
              <p className="text-gray-600">
                You have not added any products in your cart. Please go to the{" "}
                <a href="/products" className="text-blue-600">
                  product section
                </a>{" "}
                and add items to your cart.
              </p>
            </div>
          ) : (
            <div className="mt-5">
              <div className="flex gap-10">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
                  {cartData.map((item) => (
                    <CartCard
                      key={item._id}
                      item={item.productId}
                      updateCartItem={updateCartItem}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </div>
                <div className="min-w-[250px]">
                  <div className="min-h-[40vh] p-6 bg-gray-500 bg-opacity-20 rounded-lg shadow-md flex flex-col items-between justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-center">
                        Checkout
                      </h3>
                    </div>
                    <div>
                      <div className="mb-4">
                        <p className="text-lg">Total Items: {totalItems}</p>
                        <p className="text-lg">
                          Total Price: ${totalPrice.toFixed(2)}
                        </p>
                      </div>
                      <button
                        className="w-full bg-[#23c45e] hover:bg-[#53c47c] text-white px-4 py-2 rounded text-lg"
                        onClick={() => setTransactionModal(true)}
                      >
                        Check Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {transactionModal && (
        <TransactionModal
          modalState={transactionModal}
          onClose={() => setTransactionModal(false)}
          products={cartData}
          amount={totalPrice}
          cartId={cartId}
        />
      )}
    </div>
  );
};

export default Cart;
