const { addProductSchema, addSaleSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });

  if (error && error.message === '"name" is required') {
    return { type: 'INVALID_NAME', message: error.message };
  }
  if (error && error.message === '"name" length must be at least 5 characters long') {
    return { type: 'INVALID_NAME_LENGTH', message: error.message };
  }

  return { type: null, message: '' };
};

const validateNewSale = (bodyInput) => {
  const { error } = addSaleSchema.validate(bodyInput);

  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
  validateNewSale,
};