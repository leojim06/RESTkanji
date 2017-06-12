import { Document, Model } from 'mongoose';

export interface User extends Document {
   email: string;
   firstName: string;
   lastName: string;
   userName: string;
   password: string;
   role: string;

   _hashPassword(password: string): string;
   authenticateUser(password: string): string;
   createToken(): any;
   toAuthJSON(): any;
   toJSON(): any;
}

export interface UserModel extends Model<User> { }