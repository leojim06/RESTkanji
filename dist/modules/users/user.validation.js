"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
exports.default = {
    signup: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().regex(exports.passwordReg).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            userName: Joi.string().required(),
        }
    },
};
