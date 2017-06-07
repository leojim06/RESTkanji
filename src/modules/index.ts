import userRoutes from './users/user.routes';
import { authJwt } from '../services/auth.service';

export default app => {
   app.use('/api/v1/users', userRoutes);
   app.get('/private', authJwt, (req, res) => {
      res.send('This is a private route!!!');
   });
};