const { generateToken, validate } = require("../../lib/utilities");
const user_model = require("../model/user");
const bycrypt = require("bycrypt");

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
    password: req.body.fullname || null
  };

  validate(user, (er, suc) => {
    if (er) {
      req.status(400).json(er);
    } else {
      user_model.addOne(user, (er, data) => {
        res.status(200).json(req.data);
      })
    }
  })
}


module.exports = {
  afterLogin,
  changePassword,
  add
}