const express = require("express");

const app = express();

app.use(() => {
    console.log("HELLO SERVER");
    console.log("TES");
});

app.listen(4000);

//nodemon index.js
