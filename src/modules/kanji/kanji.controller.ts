import { Request, Response } from 'express';

import Kanji from './kanji.model';
import getQuery from '../../services/query.service';

export async function createKanji(req: Request, res: Response) {
  try {
    const kanji = await Kanji.create(req.body);
    return res.status(201).json(kanji);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function getKanjiById(req: Request, res: Response) {
  try {
    const kanji = await Kanji.findKanjiById(req.params.id);
    return res.status(200).json(kanji);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function getKanjiList(req: Request, res: Response) {
  try {
    const kanji = await Kanji.list(getQuery(req.query));
    return res.status(200).json(kanji);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function updateKanji(req: Request, res: Response) {
  try {
    const kanji = await Kanji.findById(req.params.id);

    if (!kanji) {
      return res.sendStatus(404);
    }

    Object.keys(req.body).forEach(key => {
      kanji[key] = req.body[key];
    });

    return res.status(200).json(await kanji.save());
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function addKanjiSample() {
  // Para esto es el id que genera mongo
}

export async function deleteKanjiSample() {
  // Para esto es el id que genera mongo
}

export async function deleteKanji(req: Request, res: Response) {
  try {
    const kanji = await Kanji.findById(req.params.id);

    if (!kanji) {
      return res.sendStatus(404);
    }

    await kanji.remove();
    return res.sendStatus(200);
  } catch (e) {
    return res.status(400).json(e);
  }
}
