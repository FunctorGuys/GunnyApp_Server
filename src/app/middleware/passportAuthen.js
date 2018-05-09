const bcrypt = require("bcrypt");
const userCtrl = require("../controllers/user");
var LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy((username, password, done) => {
  if (username === "" || password === "") return done(new Error("Empty form!"));
  userCtrl.login(username, password, (er, user) => {
    if (er) return done(null, false, er);
    else {
      return done(null, user);
    }
  })
})