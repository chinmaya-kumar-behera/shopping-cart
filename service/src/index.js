const express = require('express');
const router = require('../router/router');
const app = express();
const cors = require('cors');


app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("API is working fine!");
})

app.use("/", router);

PORT = 5000

app.listen(PORT, () => {
    console.log("Api is running on port",PORT);
})