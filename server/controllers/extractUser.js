const jwt = require("jsonwebtoken");
const config = require("../config");
module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")){
    token = token.substring(7, token.length);
    try {
      req.user =  jwt.verify(token, config.jwtSecret);
      req.admin = req.user.admin;
    } catch (err) {
      next()
    }
    next()
  } else {
    next()
  }
};
function unauthorized(res) {
  res.status(401).json({message: "Unauthorized"})
}
