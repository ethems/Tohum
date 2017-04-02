exports.postProductPrice = async(req, res, next) => {
  req.checkParams('productID').notEmpty().isMongoId();

  req.checkBody('price').notEmpty().isCurrency();
  req.checkBody('unit').notEmpty().isValidProductPriceUnit();

  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    });
  }
  next();
};
