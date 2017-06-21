import userRoutes from './users/user.routes';
import kanaRoutes from './kana/kana.routes';
import kanjiRoutes from './kanji/kanji.routes';
import abrevRoutes from './abrev/abrev.routes';
import dictionayRoutes from './dictionary/word.routes';
import { authJwt, authRole } from '../services/auth.service';

export default app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/kanas', kanaRoutes);
  app.use('/api/v1/kanjis', kanjiRoutes);
  app.use('/api/v1/abrevs', abrevRoutes);
  app.use('/api/v1/dictionary', dictionayRoutes);
  app.get('/private',
    authJwt,
    authRole('Admin'),
    (req, res) => {
      res.status(200).json('This is a private route!!!');
    });
};