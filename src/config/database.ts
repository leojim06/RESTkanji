import * as mongoose from 'mongoose';

import constants from './constants';

//Remove the warning with Promise
// mongoose.Promise = global.Promise;
(<any>mongoose).Promise = global.Promise;

try {
   mongoose.connect(constants.MONGO_URL);
} catch (e) {
   mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
   .once('open', () => { console.log('MongoDB running'); })
   .on('error', e => { throw e; });