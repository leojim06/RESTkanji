import { Document, Model, Schema } from 'mongoose';

import { Word } from '../dictionary/word.interface';

export interface Kanji extends Document {
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

export interface KanjiModel extends Model<Kanji> {
  list(query: any): any;
  findKanjiById(id: Schema.Types.ObjectId): any;
}