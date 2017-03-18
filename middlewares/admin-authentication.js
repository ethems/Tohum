module.exports = function(req, res, next) {
  const {
    admin
  } = req.user;
  if (admin) {
    return next();
  } else {
    return res.status(401).send({
      error: 'User is not admin'
    });
  }
};