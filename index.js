//nodemon index.js
// npm install express
// npm install body-parser
// npm install express-validator
// npm install mongoose
// user = melia, pass = 538OqMJ65B4IQH8b
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// ROUTES
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

// SETTING MONGO DB
const url =
    "mongodb://melia:538OqMJ65B4IQH8b@cluster0-shard-00-00.h6wrq.mongodb.net:27017,cluster0-shard-00-01.h6wrq.mongodb.net:27017,cluster0-shard-00-02.h6wrq.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-xgpsp8-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

app.use(bodyParser.json()); //type JSON

// CORS CONFIG
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(url, connectionParams)
    .then(() => {
        app.listen(4000, () => console.log("Connection Success"));
    })
    .catch((err) => console.log(err));
