import { Document, Model } from 'mongoose';

import { User } from '../users/user.interface';

export interface Kana extends Document {
  symbol: string;
  strokes: number;
  shape: string;
  user: User;

  toJSON();
}

export interface KanaModel extends Model<Kana> {
  createKana(args: any): any;
  list(query: any): any;
  getHiragana(query: any): any;
  getKatakana(query: any): any;
}