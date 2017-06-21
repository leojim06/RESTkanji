import { Router } from 'express';
import * as validate from 'express-validation';

import * as kanjiController from './kanji.controller';
import { authJwt, authRole } from '../../services/auth.service';
import kanjiValidation from './kanji.validations';

const routes: Router = Router();

routes.post('/',
  authJwt,
  authRole('Admin'),
  validate(kanjiValidation.createKaji),
  kanjiController.createKanji);
routes.get('/', kanjiController.getKanjiList);
routes.get('/:id', kanjiController.getKanjiById);
routes.patch('/:id',
  authJwt,
  authRole('Admin'),
  validate(kanjiValidation.updateKaji),
  kanjiController.updateKanji);
routes.delete('/:id',
  authJwt,
  authRole('Admin'),
  kanjiController.deleteKanji);

export default routes;