import { Router } from 'express';
import * as validate from 'express-validation';

import * as abrevController from './abrev.controller';
import { authJwt, authRole } from '../../services/auth.service';
import abrevValidation from './abrev.validations';

const routes: Router = Router();

routes.post('/',
  authJwt,
  authRole('Admin'),
  validate(abrevValidation.createAbrev),
  abrevController.createAbrev);
routes.get('/', abrevController.getAbrevList);
routes.get('/:index', abrevController.getAbrevByIndex);
routes.patch('/:index',
  authJwt,
  authRole('Admin'),
  validate(abrevValidation.updateAbrev),
  abrevController.updateAbrev);
routes.delete('/:index',
  authJwt,
  authRole('Admin'),
  abrevController.deleteAbrev);

export default routes;