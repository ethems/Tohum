exports.getProductCategory = async(req, res, next) => {
  req.checkParams('id').notEmpty().isMongoId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};

exports.postProductCategory = async(req, res, next) => {
  req.checkBody('name').notEmpty();
  req.checkBody('newParentId').optional().isMongoId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};

exports.putProductCategory = async(req, res, next) => {
  req.checkParams('id').notEmpty().isMongoId();
  req.checkBody('name').optional().notEmpty();
  req.checkBody('newParentId').optional().isMongoId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};

exports.deleteProductCategory = async(req, res, next) => {
  req.checkParams('id').notEmpty().isMongoId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};
