
const axios = require("axios");
const Users = require("../models/userModel");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");

const getProductCategories = async (req, res) => {
  const categoryUrl = "https://fakestoreapi.com/products/categories";
  const result = await axios.get(categoryUrl);
  if (result) {
    res.json({ data: await result.data, message: "From fakestoreapi" });
  } else {
    res.json({
      data: require("../json/ProductCategory.json"),
      message: "From json data",
    });
  }
};

const getProducts = async (req, res) => {
  const url = "https://fakestoreapi.com/products";
  const result = await axios.get(url);
  if (result) {
    res.json({ data: await result.data, message: "From fakestoreapi" });
  } else {
    res.json({
      data: require("../json/Products.json"),
      message: "From json data",
    });
  }
};


const getProductById = async (req, res) => {
  const { id } = req.params;

  const categoryUrl = `https://fakestoreapi.com/products/${id}`;
  const result = await axios.get(categoryUrl);
  if (result) {
    res.json({ data: await result.data, message: "From fakestoreapi" });
  }
}

const addToCart = async (req, res) => {
  try {
    const { userId, cart } = req.body;

    const userExist = await Users.findById(userId);
    if (!userExist) {
      return res.status(400).json({ message: "User not found!" });
    }

    let cartResult = await cartModel.findOne({ userId });
    if (cartResult) {
      const isProductExist = cartResult.cart.find(
        (item) => item.productId == cart.productId
      );
      if (isProductExist) {
        return res.status(200).json({ message: "Item already exists" });
      } else {
        cartResult.cart.push(cart);
        await cartResult.save();
      }
    } else {
      cartResult = await cartModel.create(req.body);
    }

    return res
      .status(200)
      .json({ massage: "Item added to cart", data: cartResult });
  } catch (err) {
    console.log(err);
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const userExist = await Users.findById(userId);
    if (!userExist) {
      return res.status(400).json({ message: "User not found!" });
    }

    let productsData = [];

    const url = "https://fakestoreapi.com/products";
    const result = await axios.get(url);

    if (result) {
      productsData = result.data;
    } else {
      productsData = require("../json/Products.json");
    }

    let cartResult = await cartModel.findOne({ userId });
    const productsIds = cartResult.cart.map((item) => item.productId);

    let cartData = productsData.filter((item) => productsIds.includes(item.id));
    const { _id } = cartResult;

    let newResult = [];
    for (let i = 0; i < cartData.length; i++) {
      newResult.push({ ...cartData[i], quantity: cartResult.cart[i].quantity });
    }

    return res
      .status(200)
      .json({ message: "Fetched successfully", data: newResult ,_id});
  } catch (err) {
    console.log(err);
  }
};

const getOrders = async (req, res) => {
  try {
    const { userId } = req.body;

  const userExist = await Users.findById(userId);
  if (!userExist) {
    return res.status(400).json({ message: "User not found!" });
    }
    
    const result = await orderModel.find({ userId });

    res.status(200).json({ message: "Fetched data", data: result });

  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  getProductById,
  getProducts,
  getProductCategories,
  addToCart,
  getCart,
  getOrders,
};