const models = require('../models');

const findAll = async () => {
  const products = await models.productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await models.productsModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const addProduct = async (name) => {
  const newProductId = await models.productsModel.insert({ name });
  const newProduct = await models.productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  addProduct,
};