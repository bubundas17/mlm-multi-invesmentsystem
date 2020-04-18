const jwt = require("jsonwebtoken");
const config = require("../config");
module.exports = (req, res, next) => {
  if(req.user && req.user._id) {
    return next()
  }
  unauthorized(res);
};
function unauthorized(res) {
  res.status(401).json({message: "Unauthorized"})
}
