module.exports = function (User, Community, passport) {
  const express = require('express');
  const router = express.Router();
  const multer = require('multer');
  const bcrypt = require('bcryptjs');
  const path = require('path');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  router.post('/login', multer().none(), function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({ message: info.message, success: false });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.send({ message: '', success: true, user: user });
      });
    })(req, res, next);
  });

  router.post('/register', upload.single('avatar'), (req, res) => {
    let { username, password, confirmpass, email } = req.body;
    if (password != confirmpass) {
      return res.status(400).send({
        message: 'Подтверждение пароля не совпадает с введенным ранее',
      });
    }
    User.findOne({
      where: {
        username: username,
      },
    }).then((user) => {
      if (user) {
        return res.status(400).send({
          message: 'Пользователь с указанным никнеймом уже существует',
          success: false,
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt).then((hash) => {
            if (!req.file) {
              req.file = { filename: 'defaultpfp.svg' };
            }
            let newuser = User.build({
              username: username,
              password: hash,
              profilepictureid: req.file.filename,
              email: email,
            });
            newuser
              .save()
              .then(() => {
                return res.status(200).send({ message: '', success: true });
              })
              .catch((err) => {
                return res.status(403).send({ message: err, success: false });
              });
          });
        });
      }
    });
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.send(200);
  });

  router.get('/profilepicture/:userid?', (req, res, next) => {
    if (!req.params.userid) {
      next();
      return;
    }
    User.findByPk(req.params.userid).then((user) => {
      if (!user) {
        res.send({ message: 'Пользователя с таким ID не существует' });
      }
      res.sendFile(path.join(__dirname, 'uploads', user.profilepictureid));
    });
  });

  router.get('/profilepicture', (req, res) => {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
    }
    res.sendFile(path.join(__dirname, 'uploads', req.user.profilepictureid));
  });

  router.get('/getcurrentuser', (req, res) => {
    if (req.user) {
      res.send({
        isAuthenticated: true,
        id: req.user.id,
        username: req.user.username,
        profilepictureid: req.user.profilepictureid,
      });
    } else {
      res.send({ isAuthenticated: false });
    }
  });

  router.get('/getuser/:id', (req, res) => {
    if (req.isAuthenticated()) {
      User.findByPk(req.params.id).then((user) => {
        if (user) {
          res.send({
            username: user.username,
            profilepictureid: user.profilepictureid,
          });
        } else {
          res.send({ message: 'Пользователя с таким ID не существует' });
        }
      });
    } else {
      res.sendStatus(401);
    }
  });

  router.get('/communities', (req, res) => {
    Community.findAll().then((result) => res.send(result));
  });

  router.post('/newcommunity', (req, res) => {
    let { communityname, description } = req.body;
    let newcommunity = Community.build({
      communityname: communityname,
      description: description,
    });
    newcommunity.save().then(() => res.redirect('/communities'));
  });
  return router;
};
