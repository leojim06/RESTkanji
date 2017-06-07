import { Schema, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

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

KanaSchema.statics = {
   createKana(args, user) {
      return this.create({
         ...args, user,
      })
   }
}

export default model('Kana', KanaSchema);