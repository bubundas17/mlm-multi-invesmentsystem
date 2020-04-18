module.exports = (req, res, next) => {
  if(req.admin){
    return next()
  }
  unauthorized(res)
};
function unauthorized(res) {
  res.status(401).json({message: "Unauthorized"})
}
