import { Request, Response } from 'express';

import Kana from './kana.model';

export async function createKana(req: Request, res: Response) {
   try {
      const kana = await Kana.createKana(req.body, req.user._id);
      // const kana = await Kana.create({ ...req.body, user: req.user._id });
      return res.status(201).json(kana);
   } catch (e) {
      return res.status(400).json(e);
   }
}