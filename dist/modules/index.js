"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_routes_1 = require("./users/user.routes");
var kana_routes_1 = require("./kana/kana.routes");
var kanji_routes_1 = require("./kanji/kanji.routes");
var abrev_routes_1 = require("./abrev/abrev.routes");
var word_routes_1 = require("./dictionary/word.routes");
var auth_service_1 = require("../services/auth.service");
exports.default = function (app) {
    app.use('/api/v1/users', user_routes_1.default);
    app.use('/api/v1/kanas', kana_routes_1.default);
    app.use('/api/v1/kanjis', kanji_routes_1.default);
    app.use('/api/v1/abrevs', abrev_routes_1.default);
    app.use('/api/v1/dictionary', word_routes_1.default);
    app.get('/private', auth_service_1.authJwt, auth_service_1.authRole('Admin'), function (req, res) {
        res.status(200).json('This is a private route!!!');
    });
};
