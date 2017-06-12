import { Document, Model, Schema } from 'mongoose';

import { Word } from '../dictionary/word.interface';

export interface Kana extends Document {
   kanji: string;
   onYomi: {
      reading: string[];
      meaning: string[];
   };
   kunYomi: {
      reading: string[];
      meaning: string[];
   };
   KAC: number;
   radical: string;
   strokes: number;
   level: number;
   dictionary: Word[];

   toJSON();
}

export interface KanaModel extends Model<Kana> {
   list(query: any): any;
   findKanjiById(id: Schema.Types.ObjectId): any;
}