"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_local_1 = require("passport-local");
var passport_jwt_1 = require("passport-jwt");
var user_model_1 = require("../modules/users/user.model");
var constants_1 = require("../config/constants");
// Local stategy
var localOpts = {
    usernameField: 'email',
};
var localStrategy = new passport_local_1.Strategy(localOpts, function (email, password, done) { return __awaiter(_this, void 0, void 0, function () {
    var user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, done(null, false)];
                }
                else if (!user.authenticateUser(password)) {
                    return [2 /*return*/, done(null, false)];
                }
                return [2 /*return*/, done(null, user)];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, done(e_1, false)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Jwt strategy
var jwtOpts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
    secretOrKey: constants_1.default.JWT_SECRET,
};
var jwtStrategy = new passport_jwt_1.Strategy(jwtOpts, function (payload, done) { return __awaiter(_this, void 0, void 0, function () {
    var user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.findById(payload._id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, done(null, false)];
                }
                return [2 /*return*/, done(null, user)];
            case 2:
                e_2 = _a.sent();
                return [2 /*return*/, done(e_2, false)];
            case 3: return [2 /*return*/];
        }
    });
}); });
passport.use(localStrategy);
passport.use(jwtStrategy);
//Rol strategy
var roleStrategy = function (role) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.default.findById(req.user)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.sendStatus(404);
                        }
                        if (user.role === role) {
                            return [2 /*return*/, next()];
                        }
                        res.sendStatus(401);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, next(e_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
};
exports.authLocal = passport.authenticate('local', { session: false });
exports.authJwt = passport.authenticate('jwt', { session: false });
exports.authRole = roleStrategy;
