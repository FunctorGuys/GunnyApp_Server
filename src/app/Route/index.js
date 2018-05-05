var router = require("express").Router();
var userRouter = require("./user");

router.use("/user", userRouter);

module.exports = router;