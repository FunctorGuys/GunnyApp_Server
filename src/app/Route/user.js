var router = require("express").Router();
var { authExpressJwt, checkTokenExpiry } = require("../middleware");
var passport = require("passport");

var userControler = require("../controllers/user");

// const auth = [ authExpressJwt, checkTokenExpiry ];
const auth = [ authExpressJwt ];

router.post("/login", passport.authenticate('local', {
  session: false
}), userControler.afterLogin);

router.post("/register", userControler.add);

router.get("/changePassword", ...auth, userControler.changePassword);
module.exports = router;