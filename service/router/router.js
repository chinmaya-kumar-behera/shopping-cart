const express = require("express");
const router = express.Router();
const { login, signUp } = require("../controllers/userController");
const { getProductCategories, getProducts, getProductById, addToCart, getCart } = require("../controllers/productController");

router.get("/", (req, res) => {
  res.send("API is woking fine!");
});


// products routes
router.get("/api/products/categories", getProductCategories);
router.get("/api/products", getProducts);
router.get("/api/products/:id", getProductById);
router.post("/api/addtocart", addToCart);
router.get("/api/cart/:userId", getCart);


// authentication
router.post("/api/login", login);
router.post("/api/register", signUp);


module.exports = router;
