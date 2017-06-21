import * as express from 'express';

import constants from './config/constants';
import './config/database';
import middlewaresConfig from './config/middleware';
import apiRoutes from './modules';

const app = express();

middlewaresConfig(app);

app.get('/', (req, res) => {
  res.status(200).json('Hello world シ');
});

apiRoutes(app);

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

export default app;