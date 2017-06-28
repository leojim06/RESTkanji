"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var KanjiSchema = new mongoose_1.Schema({
    kanji: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'El kanji es requerido'],
    },
    onYomi: {
        reading: [{
                type: String,
                trim: true,
                required: [true, 'La lectura On-yomi es requerida'],
            }],
        meaning: [{
                type: String,
                trim: true,
                required: [true, 'El significado es requerido'],
            }]
    },
    kunYomi: {
        reading: [{
                type: String,
                trim: true,
                required: [true, 'La lectura Kun-yomi es requerida'],
            }],
        meaning: [{
                type: String,
                trim: true,
                required: [true, 'El significado es requerido'],
            }]
    },
    KAC: {
        type: Number,
        unique: true,
        required: [true, 'El orden en el KAC es requerido'],
    },
    radical: {
        type: String,
        trim: true,
        required: [true, 'El radical es requerido'],
    },
    strokes: {
        type: Number,
        required: [true, 'El número de trazos es requerido'],
    },
    level: {
        type: Number,
        required: [true, 'El nivel es requerido'],
    },
    dictionary: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Word'
        }]
});
KanjiSchema.plugin(uniqueValidator, {
    message: '{VALUE} ya fue tomado',
});
KanjiSchema.methods = {
    toJSON: function () {
        return {
            _id: this.id,
            kanji: this.kanji,
            onYomi: this.onYomi,
            kunYomi: this.kunYomi,
            KAC: this.KAC,
            radical: this.radical,
            strokes: this.strokes,
            level: this.level,
            dictionary: this.dictionary,
        };
    },
};
KanjiSchema.statics = {
    list: function (query) {
        var result = this.find()
            .sort({ kanji: 1 })
            .skip((query.limit * query.page) + query.skip)
            .limit(query.limit)
            .populate({
            path: 'dictionary',
            populate: {
                path: 'abrev',
                model: 'Abrev'
            }
        });
        if (query.level)
            result = result.find({ level: query.level });
        if (query.letter)
            result = result.find({ kanji: { $regex: query.letter } });
        if (query.count)
            result = result.count();
        return result;
    },
    findKanjiById: function (id) {
        return this.findById(id)
            .populate({
            path: 'dictionary',
            populate: {
                path: 'abrev',
                model: 'Abrev'
            }
        });
    },
};
exports.default = mongoose_1.model('Kanji', KanjiSchema);
