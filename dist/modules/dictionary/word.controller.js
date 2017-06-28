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
Object.defineProperty(exports, "__esModule", { value: true });
var word_model_1 = require("./word.model");
var query_service_1 = require("../../services/query.service");
function createWord(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var word, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, word_model_1.default.createWord(req.body)];
                case 1:
                    word = _a.sent();
                    return [2 /*return*/, res.status(201).json(word)];
                case 2:
                    e_1 = _a.sent();
                    res.status(400).json(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createWord = createWord;
function getDictionary(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var dictionary, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, word_model_1.default.list(query_service_1.default(req.query))];
                case 1:
                    dictionary = _a.sent();
                    return [2 /*return*/, res.status(200).json(dictionary)];
                case 2:
                    e_2 = _a.sent();
                    res.status(400).json(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getDictionary = getDictionary;
function getWordById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var word, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, word_model_1.default.findWordById(req.params.id)];
                case 1:
                    word = _a.sent();
                    return [2 /*return*/, res.status(200).json(word)];
                case 2:
                    e_3 = _a.sent();
                    res.status(400).json(e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getWordById = getWordById;
function updateWord(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var word_1, _a, _b, e_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, word_model_1.default.findById(req.params.id)];
                case 1:
                    word_1 = _c.sent();
                    if (!word_1) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    Object.keys(req.body).forEach(function (key) {
                        word_1[key] = req.body[key];
                    });
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, word_1.save()];
                case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                case 3:
                    e_4 = _c.sent();
                    res.status(400).json(e_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateWord = updateWord;
function deleteWord(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var word, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, word_model_1.default.findById(req.params.id)];
                case 1:
                    word = _a.sent();
                    if (!word) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [4 /*yield*/, word.remove()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(200)];
                case 3:
                    e_5 = _a.sent();
                    res.status(400).json(e_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteWord = deleteWord;
