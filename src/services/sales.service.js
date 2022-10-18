const models = require('../models');
const { validateNewSale } = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await models.salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (productId) => {
  const sale = await models.salesModel.findById(productId);
  if (sale.length > 0) return { type: null, message: sale };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const verifyProduct = async (salesInput) => {
  const promises = salesInput.map((sale) => models.productsModel.findById(sale.productId));
  const result = await Promise.all(promises);
  const invalidProducts = result.some((product) => product === undefined);
  return invalidProducts;
};

const addSale = async (salesInput) => {
  const error = validateNewSale(salesInput);
  if (error.type) return error;
  if (await verifyProduct(salesInput)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const newSaleId = await models.salesModel.createSale();

  const promises = salesInput
    .map((sale) => models.salesModel.insert(newSaleId, sale.productId, sale.quantity));

  await Promise.all(promises);

  const message = {
    id: newSaleId,
    itemsSold: salesInput,
  };

  return { type: null, message };
};

module.exports = {
  findAll,
  findById,
  addSale,
};