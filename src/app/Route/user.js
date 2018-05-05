var router = require("express").Router();
var { authExpressJwt, checkTokenExpiry } = require("../middleware");
var passport = require("passport");

var userControler = require("../controllers/user");

const auth = [ authExpressJwt, checkTokenExpiry ];
router.post("/login", passport.authenticate('local', {
  session: false
}), userControler.afterLogin);

router.get("/changePassword", ...auth, userControler.changePassword);
module.exports = router;