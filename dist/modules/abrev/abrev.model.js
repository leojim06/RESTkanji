"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var AbrevSchema = new mongoose_1.Schema({
    abrev: {
        index: true,
        type: String,
        trim: true,
        unique: true,
        required: [true, 'La abreviatura es requerida'],
    },
    meaning: {
        type: String,
        trim: true,
        required: [true, 'El significado de la abreviatura es requerido']
    }
});
AbrevSchema.plugin(uniqueValidator, {
    message: '{VALUE} ya fue tomado',
});
AbrevSchema.methods = {
    toJSON: function () {
        return {
            abrev: this.abrev,
            meaning: this.meaning,
        };
    },
    toIdJSON: function () {
        return {
            _id: this.id,
            abrev: this.abrev,
            meaning: this.meaning,
        };
    },
};
exports.default = mongoose_1.model('Abrev', AbrevSchema);
