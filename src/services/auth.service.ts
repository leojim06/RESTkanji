import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import { IStrategyOptions, Strategy, VerifyFunction } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import User from '../modules/users/user.model';
import constants from '../config/constants';

// Local stategy
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

// Jwt strategy
const jwtOpts: StrategyOptions = {
   jwtFromRequest: ExtractJwt.fromAuthHeader(),
   secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
   try {
      const user = await User.findById(payload._id);

      if (!user) {
         return done(null, false);
      }

      return done(null, user);
   } catch (e) {
      return done(e, false);
   }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

//Rol strategy
const roleStrategy = function (role) {
   return async function (req, res, next) {
      try {
         const user = await User.findById(req.user);

         if (!user) {
            res.sendStatus(404);
         }

         if (user.role === role) {
            return next();
         }

         res.sendStatus(401);
      } catch (e) {
         return next(e);
      }
   }
}

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
export const authRole = roleStrategy;