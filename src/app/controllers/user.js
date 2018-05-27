const { generateToken, validate } = require("../../lib/utilities");
const user_model = require("../model/user");
const bcrypt = require("bcrypt");
const KEY_SECRET = require("../../config").KEY_SECRET;
const saltRounds = 10;



const afterLogin = (req, res) => {
  const token = generateToken(req.user);
  res.status(200).json({token});
}

const changePassword = (req, res) => {
  res.status(200).json(req.userDecoded);
}

const add = (req, res) => {
  const user = {
    username: req.body.username || null,
    password: req.body.password || null,
    cfpassword: req.body.cfpassword || null,
    fullname: req.body.fullname || null
  };

  user.username = user.username.toLowerCase();

  validate.validateFormUser(user, (er, suc) => {
    console.log(er, suc);
    if (er) {
      res.status(400).json(er);
    } else {
      bcrypt.hash(user.password, saltRounds, (er, hash) => {
        user.password = hash;
        user_model.addOne(user, (er, data) => {
          if (er) res.status(409).json(er);
          else {
            res.status(200).json(data);
          }
        })
      }, KEY_SECRET);
    }
  })
}

const login = (username, password, cb) => {
  user_model.getUserByUsername(username, (er, data) => {
    if (er) cb(er);
    else {
      bcrypt.compare(password, data.password, (er, check) => {
        if (check) {
          cb(false, data);
        } else {
          cb({password: "Password incorrect!"});
        }
      })
    }
  })
}

const increateWin = (id_winner, cb) => {
  user_model.increateWin(id_winner, (er, success) => {
    if (er) cb(er);
    else cb(false, success);
  });
} 

const increateLose = (id_loser, cb) => {
  user_model.increateLose(id_loser, (er, success) => {
    if (er) cb(er);
    else cb(false, success);
  });
} 

module.exports = {
  login,
  afterLogin,
  changePassword,
  add,
  increateWin,
  increateLose
}