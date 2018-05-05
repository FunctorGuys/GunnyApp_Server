var { generateToken } = require("../../lib/utilities");

const afterLogin = (req, res) => {
  const token = generateToken(req.user);
  res.status(200).json({token});
}

const changePassword = (req, res) => {
  res.status(200).json(req.userDecoded);
}
module.exports = {
  afterLogin,
  changePassword
}