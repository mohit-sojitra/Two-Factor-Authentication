const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const tfa = require('./routes/tfa');

dotenv.config({ path: ".env" });
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use("/tfa",tfa);

mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then((result) => {
        const server = app.listen(3000);
    })
    .catch((err) => console.log(err));
