import { Document, Model, Schema } from 'mongoose';

export interface Word extends Document {
   word: string;
   reqding: string;
   meaning: string[];

   toJSON();
}

export interface WordModel extends Model<Word> {
   createWord(body: Word): any;
   list(query: any): any;
   findWordById(id: Schema.Types.ObjectId): Word;
   deleteWord(id: Schema.Types.ObjectId): any;
}