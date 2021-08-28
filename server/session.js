const session = require('express-session');

module.exports = function (sessionStore) {
  return session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  });
};
