const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { connectToDatabase } = require('./config/dbConfig');
const router = require('./router/router');
connectToDatabase();

app.use(express.json())

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://chinmaya-shoppingcart.vercel.app",
    ],
  })
);

app.get("/", (req, res) => {
    res.send("API is working fine!");
})

app.use("/", router);

PORT = 5000

app.listen(PORT, () => {
    console.log("Api is running on port",PORT);
})