const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  res.send("API is woking fine!");
});

router.get("/api/products/categories", async(req, res) => {
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
});

router.get("/api/products", async (req, res) => {
  const categoryUrl = "https://fakestoreapi.com/products";
  const result = await axios.get(categoryUrl);
  if (result) {
    res.json({ data: await result.data, message: "From fakestoreapi" });
  } else {
    res.json({
      data: require("../json/Products.json"),
      message: "From json data",
    });
  }
});

router.get("/api/products/:id", async (req, res) => {
  console.log('proct id controller called')
  const { id } = req.params;
  console.log(id);

  const categoryUrl = `https://fakestoreapi.com/products/${id}`;
  const result = await axios.get(categoryUrl);
  if (result) {
    res.json({ data: await result.data, message: "From fakestoreapi" });
  }
});







module.exports = router;
