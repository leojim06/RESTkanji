"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
exports.default = {
    createWord: {
        body: {
            word: Joi.string().required(),
            reading: Joi.string().required(),
            meaning: Joi.array().required(),
            abrev: Joi.array(),
        },
    },
    updateWord: {
        body: {
            word: Joi.string(),
            reading: Joi.string(),
            meaning: Joi.array(),
            abrev: Joi.forbidden(),
        },
    }
};
