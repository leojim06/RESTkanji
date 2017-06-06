import { Router } from 'express';
import * as validate from 'express-validation';

import * as userController from './user.controller';
import userValidation from './user.validation';

const routes: Router = Router();

routes.post('/signup', validate(userValidation.signup), userController.signUp);

export default routes;