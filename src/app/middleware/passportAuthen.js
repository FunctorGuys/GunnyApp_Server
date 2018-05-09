var LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy((username, password, done) => {
  console.log(username);
  if (username === "" || password === "") return done(new Error("Empty form!"));
  if (!(username === "tinh" && password === "123")) return done(null, false, { message: "username or password inccorect" });
  return done(null, { username, password });
})