exports.getProductCategory = async(req, res, next) => {
  req.checkParams('id').notEmpty().isObjectId();
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
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};

exports.putProductCategory = async(req, res, next) => {
  req.checkParams('id').notEmpty().isObjectId();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};
