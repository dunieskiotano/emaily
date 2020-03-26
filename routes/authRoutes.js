const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send({ message: 'User has been logged out' });
    res.send(req.user);
  });

  app.get('/auth/google/callback', (req, res) => {
    console.log(req.user.firstName);
    res.send({message: `You are logged in, ${req.user.firstName}. Sabias que te amo?`});
  });

  app.get('/api/current_user', (req, res) => {
    //res.send(req.session); // gets the cookie id/session id/mongoDB id
    res.send(req.user);
  });
};
