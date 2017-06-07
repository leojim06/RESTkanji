import { Router } from 'express';
import * as validate from 'express-validation';

import * as kanaController from './kana.controller';
import { authJwt } from '../../services/auth.service';
import kanaValidation from './kana.validations';

const routes: Router = Router();

routes.post('/',
   authJwt,
   validate(kanaValidation.createKana),
   kanaController.createKana);
routes.get('/:id', kanaController.getKanaById);
routes.get('/', kanaController.getKanaList);
routes.patch('/:id',
   authJwt,
   validate(kanaValidation.updateKana),
   kanaController.updateKana);
routes.delete('/:id', authJwt, kanaController.deleteKana);

export default routes;