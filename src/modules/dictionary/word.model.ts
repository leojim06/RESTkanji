import { Schema, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { WordModel } from './word.interface';
import Kanji from '../kanji/kanji.model';

const WordSchema: Schema = new Schema({
   word: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'La palabra de ejemplo es requerida'],
   },
   reading: {
      type: String,
      trim: true,
      required: [true, 'La lectura de la palabra de ejemplo es requerida'],
   },
   meaning: [{
      type: String,
      trim: true,
      required: [true, 'El significado es requerido']
   }],
   abrev: [{
      type: Schema.Types.ObjectId,
      ref: 'Abrev',
   }]
});

WordSchema.plugin(uniqueValidator, {
   message: '{VALUE} ya fue tomado',
});

WordSchema.pre('remove', function (next) {
   let word = this;
   Kanji.update({ dictionary: word._id },
      { $pull: { dictionary: word._id } }).exec();
   next();
});

WordSchema.methods = {
   toJSON() {
      return {
         _id: this._id,
         word: this.word,
         reading: this.reading,
         meaning: this.meaning,
         abrev: this.abrev
      }
   },
};

WordSchema.statics = {
   async createWord(body) {
      const word = await this.create(body);
      return await this.findById(word._id).populate('abrev');
   },
   list(query) {
      let result = this.find()
         .sort({ word: 1 })
         .skip((query.limit * query.page) + query.skip)
         .limit(query.limit)
         .populate('abrev');
      if (query.letter) result = result.find({ word: { $regex: query.letter } })
      if (query.count) result = result.count();
      return result;
   },
   findWordById(id) {
      return this.findById(id).populate('abrev');
   },
}

export default <WordModel>model('Word', WordSchema);