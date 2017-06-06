import { Router } from 'express';
import * as validate from 'express-validation';

import * as userController from './user.controller';
import userValidation from './user.validation';
import { authLocal } from '../../services/auth.service';

const routes: Router = Router();

routes.post('/signup', validate(userValidation.signup), userController.signUp);
routes.post('/login', authLocal, userController.login);

export default routes;