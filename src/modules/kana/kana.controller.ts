import { Request, Response } from 'express';

import Kana from './kana.model';
import getQuery from '../../services/query.service';

export async function createKana(req: Request, res: Response) {
   try {
      const kana = await Kana.createKana(req.body, req.user._id);
      // const kana = await Kana.create({ ...req.body, user: req.user._id });
      return res.status(201).json(kana);
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function getKanaById(req: Request, res: Response) {
   try {
      const kana = await Kana.findById(req.params.id).populate('user');
      return res.status(200).json(kana);
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function getKanaList(req: Request, res: Response) {
   try {
      const kana = await Kana.list(getQuery(req.query));
      return res.status(200).json(kana);
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function getHiragana(req: Request, res: Response) {
   try {
      const hiragana = await Kana.getHiragana(getQuery(req.query));
      return res.status(200).json(hiragana);
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function getKatakana(req: Request, res: Response) {
   try {
      const hiragana = await Kana.getKatakana(getQuery(req.query));
      return res.status(200).json(hiragana);
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function updateKana(req: Request, res: Response) {
   try {
      const kana = await Kana.findById(req.params.id);

      if (!kana.user.equals(req.user._id)) {
         return res.sendStatus(401);
      }

      Object.keys(req.body).forEach(key => {
         kana[key] = req.body[key];
      });

      return res.status(200).json(await kana.save());
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function deleteKana(req: Request, res: Response) {
   try {
      const kana = await Kana.findById(req.params.id);

      if (!kana.user.equals(req.user._id)) {
         return res.sendStatus(401);
      }

      await kana.remove();

      return res.sendStatus(200);
   } catch (e) {
      return res.status(400).json(e);
   }
}
