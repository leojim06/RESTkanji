import { Request, Response, NextFunction } from 'express';

import User from './user.model';

export async function signUp(req: Request, res: Response) {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export function login(req: Request, res: Response, next: NextFunction) {
  res.status(200).json(req.user.toAuthJSON());
  return next();
}