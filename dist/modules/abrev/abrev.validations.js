"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
exports.default = {
    createAbrev: {
        body: {
            abrev: Joi.string().required(),
            meaning: Joi.string().required(),
        },
    },
    updateAbrev: {
        body: {
            abrev: Joi.string(),
            meaning: Joi.string(),
        },
    },
};
