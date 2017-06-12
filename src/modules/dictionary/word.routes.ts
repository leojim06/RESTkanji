import { Router } from 'express';
import * as validate from 'express-validation';

import * as dictionaryController from './word.controller';
import { authJwt, authRole } from '../../services/auth.service';
import wordValidation from './word.validations';

const routes: Router = Router();

routes.post('/',
   authJwt,
   authRole('Admin'),
   validate(wordValidation.createWord),
   dictionaryController.createWord);
routes.get('/', dictionaryController.getDictionary);
routes.get('/:id', dictionaryController.getWordById);
routes.patch('/:id',
   authJwt,
   authRole('Admin'),
   validate(wordValidation.updateWord),
   dictionaryController.updateWord);
routes.delete('/:id',
   authJwt,
   authRole('Admin'),
   dictionaryController.deleteWord);

export default routes;