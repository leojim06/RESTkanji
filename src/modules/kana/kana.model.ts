import { Schema, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { KanaModel } from './kana.interface';

const KanaSchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

KanaSchema.plugin(uniqueValidator, {
  message: '{VALUE} ya fue tomado',
});

KanaSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      symbol: this.symbol,
      strokes: this.strokes,
      shape: this.shape,
      user: this.user,
    }
  },
};

KanaSchema.statics = {
  createKana(args, user) {
    return this.create({
      ...args, user,
    })
  },
  list(query) {
    let result = this.find()
      .sort({ symbol: 1 })
      .skip((query.limit * query.page) + query.skip)
      .limit(query.limit)
      .populate('user');
    if (query.count) return result.count();
    return result;
  },
  getHiragana(query) {
    let result = this.find({ shape: 'Hiragana' })
      .sort({ symbol: 1 })
      .skip((query.limit * query.page) + query.skip)
      .limit(query.limit)
      .populate('user');
    if (query.count) return result.count();
    return result;
  },
  getKatakana(query) {
    let result = this.find({ shape: 'Katakana' })
      .sort({ symbol: 1 })
      .skip((query.limit * query.page) + query.skip)
      .limit(query.limit)
      .populate('user');
    if (query.count) return result.count();
    return result;
  },
}

export default <KanaModel>model('Kana', KanaSchema);