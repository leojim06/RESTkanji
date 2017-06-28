"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var morgan = require("morgan");
var bodyParser = require("body-parser");
var compression = require("compression");
var helmet = require("helmet");
var passport = require("passport");
var isDev = process.env.NODE_ENV === 'development';
var isProd = process.env.NODE_ENV === 'production';
exports.default = function (app) {
    if (isProd) {
        app.use(compression());
        app.use(helmet());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.set('json spaces', 3);
    app.set('json replacer');
    if (isDev) {
        app.use(morgan('dev'));
    }
};
