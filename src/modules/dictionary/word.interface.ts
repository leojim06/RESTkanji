import { Document, Model, Schema } from 'mongoose';

export interface Word extends Document {
  word: string;
  reading: string;
  meaning: string[];
  abrev: Schema.Types.ObjectId[];

  toJSON();
}

export interface WordModel extends Model<Word> {
  createWord(body: Word): any;
  list(query: any): any;
  findWordById(id: Schema.Types.ObjectId): Word;
}