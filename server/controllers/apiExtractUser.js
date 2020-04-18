const jwt = require("jsonwebtoken");
const config = require("../config");
const VerifyUser = require("../lib/verifyApiToken");

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    token = token.substring(7, token.length);
    VerifyUser.verifyToken(token)
      .then(user => {
        req.user = user;
        next()
      })
      .catch(err => {
        next()
      })
  } else {
    next()
  }
};

function unauthorized(res) {
  res.status(401).json({message: "Unauthorized"})
}
