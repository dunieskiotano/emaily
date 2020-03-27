const passport = require('passport');
const GoogleStratregy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  //---- User is what we get from the DB ----//
  // ---- this id is not the one from Google, but the id inside the users collection in MongoDB ---//
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStratregy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
      proxy: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        googleId: profile.id // This id is the id provided from Google
      });
      if (existingUser) {
        console.log(
          'User',
          profile.name.givenName,
          profile.name.familyName,
          'already exists.'
        );
        return done(null, existingUser); // the code ends here
      }
      const user = await new User({
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      }).save();
      done(null, user);
    }
  )
);
