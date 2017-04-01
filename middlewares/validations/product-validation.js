exports.getProduct = async(req, res, next) => {
  req.checkParams('id').notEmpty().isMongoId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};

exports.postProduct = async(req, res, next) => {
  req.checkBody('name').notEmpty();
  req.checkBody('categoryID').notEmpty();
  req.checkBody('address').isAddress();
  req.checkBody('active').optional().isBoolean();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};

exports.putProduct = async(req, res, next) => {
  req.checkParams('id').notEmpty().isMongoId();
  req.checkBody('name').optional().notEmpty();
  req.checkBody('categoryID').optional().notEmpty();
  req.checkBody('address').optional().isAddress();
  req.checkBody('active').optional().isBoolean();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};

exports.deleteProduct = async(req, res, next) => {
  req.checkParams('id').notEmpty().isMongoId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};


