exports.getUser = async(req, res, next) => {
  req.checkParams('id').notEmpty().isObjectId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};


exports.putUser = async(req, res, next) => {
  req.checkParams('id').notEmpty().isObjectId();
  req.checkBody('name.primaryName').optional().notEmpty();
  req.checkBody('name.lastName').optional().notEmpty();
  req.checkBody('addresses').optional().eachIsAddress();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};
