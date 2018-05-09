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

router.get("/abc", (req, res) => {
  res.status(200).json({
    message: "YOU ARE CONNECTED"
  })
})

router.get("/changePassword", ...auth, userControler.changePassword);
module.exports = router;