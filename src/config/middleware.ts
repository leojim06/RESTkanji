import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'prduction';

export default app => {
   if (isProd) {
      app.use(compression());
      app.use(helmet());
   }
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   if (isDev) {
      app.use(morgan('dev'));
   }
}