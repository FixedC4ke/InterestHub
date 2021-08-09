const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const session = require('express-session');
const SeqeulizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
let router = express.Router();

const sequelize = new Sequelize(
  "postgres://myproj:myproj@localhost:5432/interesthub"
);
const app = express();
const PORT = 8888;

app.use(express.urlencoded({ extended: false }));
// app.use(express.static(__dirname));

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
  profilepictureid:{
    type: DataTypes.TEXT,
    defaultValue: 'defaultpfp'
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({where:{username: username}})
        .then((user)=>{
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

app.use('/', router);

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'uploads/')
  },
  filename: (req, file, cb)=>{
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

router.post('/register', upload.single('avatar'), (req, res)=>{
    let {username, password, confirmpass, email} = req.body;
    if (password!=confirmpass){
      res.sendStatus(400);
    }
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt)
        .then((hash)=>{
            let newuser = User.build(
              {
                username: username, 
                password: hash,
                profilepictureid: req.file.filename,
                email: email
              }
            );
            newuser.save()
                .then(()=>{
                  res.redirect('/login');
                });
        });
    });
});

router.get('/logout', (req, res)=>{
    req.logout();
    res.send({authenticated: req.isAuthenticated()});
});

router.get('/isLoggedIn', (req, res)=>res.send(req.isAuthenticated()));

router.get('/profilepicture', (req, res)=>{
  res.sendFile(path.join(__dirname, 'uploads', req.user.profilepictureid));
})

sequelize.sync({force: true}).then(() => {
  console.log('Model sync');
  sessionStore.sync().then(()=>{
    console.log('Storage sync');
    app.listen(PORT).then = () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    };
  });
});