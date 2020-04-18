const UserDb =  require("../models/User");

module.exports = async (req, res, next) => {
  if(! req.session.userId) {
    return unauthorized(res);
  }
  try {
    let user = await UserDb.findById(req.session.userId);

    if(user.password === req.session.hash) {
      req.user = user.safeData;
      next()
    } else {
      return unauthorized(res);
    }
  } catch (e) {
    return unauthorized(res);
  }

};
function unauthorized(res) {
  res.status(401).json({message: "Unauthorized"})
}
