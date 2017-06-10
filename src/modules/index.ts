import userRoutes from './users/user.routes';
import kanaRoutes from './kana/kana.routes';
import { authJwt, authRole } from '../services/auth.service';

export default app => {
   app.use('/api/v1/users', userRoutes);
   app.use('/api/v1/kanas', kanaRoutes);
   app.get('/private',
      authJwt,
      authRole('Admin'),
      (req, res) => {
         res.send('This is a private route!!!');
      });
};