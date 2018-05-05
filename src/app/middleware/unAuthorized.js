module.exports = (er, req, res, next) => {
  if (er.name === "UnauthorizedError") {
    res.status(401).json({error: "Unauthorized..."});
  }
}