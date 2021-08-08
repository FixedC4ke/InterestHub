const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const session = require('express-session');
const SeqeulizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize(
  "postgres://myproj:myproj@localhost:5432/interesthub"
);
const app = express();
const PORT = 8888;

app.use(express.urlencoded({ extended: false }));

const User = sequelize.define("user", {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({where:{username: username}})
        .then((user)=>{
            console.log(user.id);
            if (!user) { return done(null, false); }
            bcrypt.compare(password, user.password)
                .then(result=>{
                    if (!result) { return done(null, false); }
                    else { return done(null, user); }
                });
        })
        .catch(err=>done(err));
}));

passport.serializeUser((user, done)=>done(null, user.id));
passport.deserializeUser((id, done)=>{
    User.findByPk(id)
        .then(user=>done(null, user))
        .catch(err=>done(err));
});

let sessionStore = new SeqeulizeStore({
    db: sequelize,
});

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000*60*60*24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

app.post('/register', (req, res)=>{
    let {username, password} = req.body;
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt)
        .then((hash)=>{
            let newuser = User.build({username: username, password: hash});
            newuser.save()
                .then(res.redirect('/login'));
        });
    });
});

app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

app.get('/isLoggedIn', (req, res)=>res.send(req.user!=null));

sequelize.sync().then(() => {
  app.listen(PORT).then = () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  };
});
