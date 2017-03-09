exports.signup = async(req, res, next) => {
  req.checkBody('email').notEmpty().isEmail();
  req.checkBody('password').notEmpty();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()});
  }
  next();
}
exports.signin = async(req, res, next) => {
  req.checkBody('email').notEmpty().isEmail();
  req.checkBody('password').notEmpty();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()});
  }
  next();
}
