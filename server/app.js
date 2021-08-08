const express = require('express');
const Sequalize = require('sequelize');
const {DataTypes} = Sequalize;
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const sequelize = new Sequalize('postgres://myproj:myproj@localhost:5432/interesthub');
const app = new express();

const User = sequelize.define("user", {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT
});

app.use(bodyParser.urlencoded({extended: false}));

passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},
    (username, password, done)=>{
        User.findOne({ where: {username: username}})
            .then(user=>{
                if (!user) { return done(null, false); }
                return done(null, user);
            })
            .catch(err=>done(err));
    }));

passport.serializeUser((user, done)=>done(null, user.id));

passport.deserializeUser((id, done)=>{
    User.findByPK(id)
        .then(user=>done(null, user));
})

app.use(passport.initialize())

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/login', passport.authenticate('local'),
    (req, res)=>{
        res.send(req.body);
    }
);

app.listen(8888);