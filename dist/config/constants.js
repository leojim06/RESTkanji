"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var devConfig = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/japaneseapi-dev',
};
var testConfig = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/japaneseapi-test',
};
var prodConfig = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/japaneseapi-prod',
};
var defaultConfig = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.SECRET || 'thisisasecret',
};
function envConfig(env) {
    switch (env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        default:
            return prodConfig;
    }
}
exports.default = __assign({}, defaultConfig, envConfig(process.env.NODE_ENV));
