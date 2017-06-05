"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
app.listen(PORT, function (err) {
    if (err) {
        throw err;
    }
    else {
        console.log("\n         Server running on port " + PORT + "\n         Running on " + process.env.NODE_ENV + "\n         Lear Japanesse\n      ");
    }
});
