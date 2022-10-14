const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  INVALID_NAME: 400,
  INVALID_NAME_LENGTH: 422,
  INVALID_PRODUCT_ID: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
