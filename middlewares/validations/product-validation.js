exports.getProduct = async(req, res, next) => {
  req.checkParams('id').notEmpty().isObjectId();
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
  req.checkBody('category').notEmpty();
  req.checkBody('address').isAddress();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};

exports.putProduct = async(req, res, next) => {
  req.checkParams('id').notEmpty().isObjectId();
  req.checkBody('name').notEmpty();
  req.checkBody('category').notEmpty();
  req.checkBody('address').isAddress();
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};