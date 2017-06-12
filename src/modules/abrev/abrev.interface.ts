import { Document, Model } from 'mongoose';

export interface Abrev extends Document {
   abrev: string;
   meaning: string;

   toJSON();
   toIdJSON();
}

export interface AbrevModel extends Model<Abrev> { }