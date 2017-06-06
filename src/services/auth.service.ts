import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import { IStrategyOptions, Strategy, VerifyFunction } from 'passport-local';

import User from '../modules/users/user.model';

const localOpts: IStrategyOptions = {
   usernameField: 'email',
};

const localStrategy = new Strategy(localOpts, async (email, password, done) => {
   try {
      const user = await User.findOne({ email: email });
      if (!user) {
         return done(null, false);
      } else if (!user.authenticateUser(password)) {
         return done(null, false);
      }

      return done(null, user);
   } catch (e) {
      return done(e, false);
   }
});

passport.use(localStrategy);

export const authLocal = passport.authenticate('local', { session: false });