"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var constants_1 = require("./config/constants");
require("./config/database");
var middleware_1 = require("./config/middleware");
var modules_1 = require("./modules");
var app = express();
middleware_1.default(app);
app.use(express.static(path.join(__dirname, '')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
modules_1.default(app);
app.listen(constants_1.default.PORT, function (err) {
    if (err) {
        throw err;
    }
    else {
        console.log("\n      Server running on port " + constants_1.default.PORT + "\n      Running on " + process.env.NODE_ENV + "\n      Learn Japanesse\n    ");
    }
});
exports.default = app;
