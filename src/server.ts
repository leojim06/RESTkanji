import * as express from 'express';

import constants from './config/constants';
import './config/database';
import middlewaresConfig from './config/middleware';

const app = express();

middlewaresConfig(app);

app.get('/', (req, res) => {
   res.status(200).send('Hello world!');
});

app.listen(constants.PORT, err => {
   if (err) {
      throw err
   } else {
      console.log(`
         Server running on port ${constants.PORT}
         Running on ${process.env.NODE_ENV}
         Learn Japanesse
      `)
   }
});