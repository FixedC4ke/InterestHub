const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = function (sequelize) {
  return new SequelizeStore({
    db: sequelize,
  });
};
