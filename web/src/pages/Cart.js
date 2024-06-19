import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductsHandler from "../handler/ProductsHandler";
import { PageContainer } from "../components/index";

const CartCard = ({ item, updateCartItem, removeFromCart },) => {
  const { id, image, title, price, category, description, quantity } = item;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    updateCartItem(id, newQuantity);
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
        <p className="text-sm text-gray-500">Price: ${price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <button
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <span className="px-2 py-1 bg-gray-200 rounded">{quantity}</span>
          <button
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full ml-2"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
        <button
          className="mt-2 text-sm text-red-600 hover:text-red-800 focus:outline-none"
          onClick={() => removeFromCart(id)}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const { getCartByUserIdHandler, updateCartItemHandler, removeCartItemHandler } = ProductsHandler();
  const [cartData, setCartData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (user?._id) {
      getCartByUserIdHandler({ userId: user._id })
        .then((res) => {
          console.log(res.data.data);
          setCartData(res.data.data);
          calculateTotals(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user?._id]);

  const calculateTotals = (cartItems) => {
    const itemsCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const itemsPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    console.log(itemsCount, itemsPrice);
    setTotalItems(itemsCount);
    setTotalPrice(itemsPrice);
  };

  const updateCartItem = (productId, newQuantity) => {
    const updatedCart = cartData.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartData(updatedCart);
    // updateCartItemHandler({ productId, quantity: newQuantity });
    calculateTotals(updatedCart);
  };

  const removeFromCart = (productId) => {
    // Implement logic to remove item from cart and update backend
    console.log(`Removing product with id ${productId} from cart`);
    removeCartItemHandler(productId);
    const updatedCart = cartData.filter((item) => item.id !== productId);
    setCartData(updatedCart);
    calculateTotals(updatedCart);
  }
  const handlePlaceOrder = () => {
    // Logic to handle placing order
    console.log("Placing order...");
  };

  return (
    <PageContainer>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartData.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex gap-5">
          <div className="">
            {cartData.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                updateCartItem={updateCartItem}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
          <div className="min-w-[300px] mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Checkout</h3>
            <p className="text-sm text-gray-600">Total Items: {totalItems }</p>
            <p className="text-sm text-gray-600">
              Total Price: ${totalPrice.toFixed(2)} 
            </p>
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Cart;
