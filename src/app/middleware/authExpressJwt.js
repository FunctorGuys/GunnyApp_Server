var expressJwt = require("express-jwt");
var { KEY_SECRET } = require("../../config");

var auth = expressJwt({
  secret: KEY_SECRET,
  userProperty: "userDecoded"
})

module.exports = auth;