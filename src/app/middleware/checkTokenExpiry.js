var checkTokenExpiry = (req, res, next) => {
  var expiry = req.userDecoded.exp;
  var expiried = (new Date().getTime()) - expiry;
  if (expiried > 0) {
	  res.status(401).json({"error": "The token has expiried"});
  }
  next();
}

module.exports = checkTokenExpiry;
