
const axios = require("axios");
const Users = require("../models/userModel");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const productCategoryModel = require("../models/productCategoryModel");
const productModel = require("../models/productModel");


const addItemsToCategoryCollection = () => {
  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]
  categories.forEach(async (name) => await productCategoryModel.create({name}));
}
const addItemsToProductsCollection = () => {
  const productsData = require("../json/Products.json");
  productsData.forEach(async (item) => {
    await productModel.create(item)
  });
}
// addItemsToCategoryCollection();
// addItemsToProductsCollection();


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
  const result = await productModel.find();

  res.json({
    data: result,
    message: "From MONGO collections",
  });
};


const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productModel.findById(id);

  if (!result) {
    return res.status(400).json({ message: "product not found" });
  }
  if (result) {
    res.json({ data: await result, message: "From Mongodb" });
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

    let result = await cartModel.findOne({ userId }).populate('cart.productId');

    return res
      .status(200)
      .json({ message: "Fetched successfully", data: result});
  } catch (err) {
    console.log(err);
  }
};

const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userId not found" });
    }

    const userExist = await Users.findById(userId);
    if (!userExist) {
      return res.status(400).json({ message: "User not found!" });
    }

    const result = await orderModel
      .find({ userId })
      .populate("products.productId");

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