module.exports = function (User) {
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const bcrypt = require('bcryptjs');
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ where: { username: username } })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'Неверный логин и/или пароль',
            });
          }
          bcrypt.compare(password, user.password).then((result) => {
            if (!result) {
              return done(null, false, {
                message: 'Неверный логин и/или пароль',
              });
            } else {
              return done(null, user);
            }
          });
        })
        .catch((err) => done(err));
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  return passport;
};
