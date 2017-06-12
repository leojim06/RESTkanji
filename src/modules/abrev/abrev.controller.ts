import { Request, Response } from 'express';

import Abrev from './abrev.model';

export async function createAbrev(req: Request, res: Response) {
   try {
      const abrev = await Abrev.create(req.body);
      return res.status(201).json(abrev);
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function getAbrevByIndex(req: Request, res: Response) {
   try {
      const abrev = await Abrev.findOne({ abrev: req.params.index })
      return res.status(200).json(abrev.toIdJSON());
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function getAbrevList(req: Request, res: Response) {
   try {
      const abrev = await Abrev.find();
      return res.status(200).json(abrev.map(abr => abr.toIdJSON()));
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function updateAbrev(req: Request, res: Response) {
   try {
      const abrev = await Abrev.findOne({ abrev: req.params.index })

      if (!abrev) {
         return res.sendStatus(404);
      }
      Object.keys(req.body).forEach(key => {
         abrev[key] = req.body[key];
      });

      return res.status(200).json(await abrev.save());
   } catch (e) {
      return res.status(400).json(e);
   }
}

export async function deleteAbrev(req: Request, res: Response) {
   try {
      const abrev = await Abrev.findOne({ abrev: req.params.index })

      if (!abrev) {
         res.sendStatus(404);
      }

      await abrev.remove();
      return res.sendStatus(200);
   } catch (e) {
      return res.status(400).json(e);
   }
}