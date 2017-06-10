import { Router } from 'express';
import * as validate from 'express-validation';

import * as kanaController from './kana.controller';
import { authJwt, authRole } from '../../services/auth.service';
import kanaValidation from './kana.validations';

const routes: Router = Router();

routes.post('/',
   authJwt,
   authRole('Admin'),
   validate(kanaValidation.createKana),
   kanaController.createKana);
routes.get('/', kanaController.getKanaList);
routes.get('/hiragana', kanaController.getHiragana);
routes.get('/katakana', kanaController.getKatakana);
routes.get('/:id', kanaController.getKanaById);
routes.patch('/:id',
   authJwt,
   validate(kanaValidation.updateKana),
   kanaController.updateKana);
routes.delete('/:id', authJwt, kanaController.deleteKana);

export default routes;