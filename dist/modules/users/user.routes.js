"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate = require("express-validation");
var userController = require("./user.controller");
var user_validation_1 = require("./user.validation");
var auth_service_1 = require("../../services/auth.service");
var routes = express_1.Router();
routes.post('/signup', validate(user_validation_1.default.signup), userController.signUp);
routes.post('/login', auth_service_1.authLocal, userController.login);
exports.default = routes;
