var jwt = require("jsonwebtoken");
var { KEY_SECRET } = require("../../config");
module.exports = (user) => {
  var expiry = new Date();
  var timeLive = 2; // min
  expiry.setMinutes(expiry.getMinutes() + timeLive);

  return jwt.sign({
    ...user,
    exp: expiry.getTime(),
  }, KEY_SECRET);
}