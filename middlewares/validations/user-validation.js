exports.getUser = async(req, res, next) => {
  req.checkParams('id').notEmpty().isMongoId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};

exports.getProductsByUser = async(req, res, next) => {
  req.checkParams('id').notEmpty().isMongoId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};


exports.putUser = async(req, res, next) => {
  req.checkParams('id').notEmpty().isMongoId();
  req.checkBody('name.primaryName').optional().notEmpty();
  req.checkBody('name.lastName').optional().notEmpty();
  req.checkBody('addresses').optional().eachIsAddress();
  req.checkBody('email').optional().isEmail();
  req.checkBody('password').optional().notEmpty();

  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  req.sanitizeBody('name.primaryName').trim();
  req.sanitizeBody('name.lastName').trim();
  req.sanitizeBody('email').trim();
  req.sanitizeBody('password').trim();

  next();
};