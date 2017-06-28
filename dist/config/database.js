"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var constants_1 = require("./constants");
//Remove the warning with Promise
// mongoose.Promise = global.Promise;
mongoose.Promise = global.Promise;
try {
    mongoose.connect(constants_1.default.MONGO_URL);
}
catch (e) {
    mongoose.createConnection(constants_1.default.MONGO_URL);
}
mongoose.connection
    .once('open', function () { })
    .on('error', function (e) { throw e; });
