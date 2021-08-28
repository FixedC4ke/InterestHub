const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  'postgres://myproj:myproj@localhost:5432/interesthub'
);
const User = require('./models/User')(sequelize, DataTypes);
const Community = require('./models/Community')(sequelize, DataTypes);
const sessionStore = require('./sessionStore')(sequelize);
const session = require('./session')(sessionStore);
const passport = require('./passport')(User);
const router = require('./router')(User, Community, passport);

const app = express();
const PORT = 8888;

app.use(express.urlencoded());
app.use(express.json());

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

sequelize.sync({ force: true }).then(() => {
  console.log('Model sync');
  sessionStore.sync().then(() => {
    console.log('Storage sync');
    app.listen(PORT).then = () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    };
  });
});
