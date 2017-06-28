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
var mongoose_1 = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var KanaSchema = new mongoose_1.Schema({
    symbol: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'El simbolo del kana es requerido'],
    },
    strokes: {
        type: Number,
        required: [true, 'El número de trazos es requerido'],
    },
    shape: {
        type: String,
        required: [true, 'El tipo del kana es requerido'],
        enum: ['Hiragana', 'Katakana'],
    },
});
KanaSchema.plugin(uniqueValidator, {
    message: '{VALUE} ya fue tomado',
});
KanaSchema.methods = {
    toJSON: function () {
        return {
            _id: this._id,
            symbol: this.symbol,
            strokes: this.strokes,
            shape: this.shape,
            user: this.user,
        };
    },
};
KanaSchema.statics = {
    createKana: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.create(body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    list: function (query) {
        if (query.letter)
            return this.findOne({ symbol: { $regex: query.letter } });
        var result = this.find()
            .sort({ symbol: 1 })
            .skip((query.limit * query.page) + query.skip)
            .limit(query.limit)
            .populate('user');
        if (query.count)
            return result.count();
        return result;
    },
    getHiragana: function (query) {
        if (query.letter)
            return this.findOne({
                symbol: { $regex: query.letter },
                shape: 'Hiragana'
            });
        var result = this.find({ shape: 'Hiragana' })
            .sort({ symbol: 1 })
            .skip((query.limit * query.page) + query.skip)
            .limit(query.limit)
            .populate('user');
        if (query.count)
            return result.count();
        return result;
    },
    getKatakana: function (query) {
        if (query.letter)
            return this.findOne({
                symbol: { $regex: query.letter },
                shape: 'Katakana'
            });
        var result = this.find({ shape: 'Katakana' })
            .sort({ symbol: 1 })
            .skip((query.limit * query.page) + query.skip)
            .limit(query.limit)
            .populate('user');
        if (query.count)
            return result.count();
        return result;
    },
};
exports.default = mongoose_1.model('Kana', KanaSchema);
