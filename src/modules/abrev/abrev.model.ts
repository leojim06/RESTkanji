import { Schema, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const AbrevSchema: Schema = new Schema({
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
   toJSON() {
      return {
         abrev: this.abrev,
         meaning: this.meaning,
      }
   },
   toIdJSON() {
      return {
         _id: this.id,
         abrev: this.abrev,
         meaning: this.meaning,
      }
   },
};

export default model('Abrev', AbrevSchema);