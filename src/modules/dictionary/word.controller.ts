import { Request, Response } from 'express';

import Word from './word.model';
import getQuery from '../../services/query.service';

export async function createWord(req: Request, res: Response) {
   try {
      const word = await Word.createWord(req.body);
      return res.status(201).json(word);
   } catch (e) {
      res.status(400).json(e);
   }
}

export async function getDictionary(req: Request, res: Response) {
   try {
      const dictionary = await Word.list(getQuery(req.query));
      return res.status(200).json(dictionary);
   } catch (e) {
      res.status(400).json(e);
   }
}

export async function getWordById(req: Request, res: Response) {
   try {
      const word = await Word.findWordById(req.params.id);
      return res.status(200).json(word);
   } catch (e) {
      res.status(400).json(e);
   }
}

export async function updateWord(req: Request, res: Response) {
   try {
      const word = await Word.findById(req.params.id);
      if (!word) {
         return res.sendStatus(404);
      }

      Object.keys(req.body).forEach(key => {
         word[key] = req.body[key];
      });

      return res.status(200).json(await word.save());
   } catch (e) {
      res.status(400).json(e);
   }
}

export async function deleteWord(req: Request, res: Response) {
   try {
      const word = await Word.findById(req.params.id);
      if (!word) {
         return res.sendStatus(404);
      }

      await word.remove();
      return res.sendStatus(200);
   } catch (e) {
      res.status(400).json(e);
   }
}