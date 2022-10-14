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

const addSale = async (bodyInput) => {
  const error = validateNewSale(bodyInput);
  if (error.type) return error;

  const newSales = [];

  await bodyInput.map(async (sale) => {
    const newSaleId = await models.salesModel.insert(sale);
    const newSale = await models.salesModel.findById(newSaleId);
    newSales.push(newSale);
  });

  return { type: null, message: newSales };
};

module.exports = {
  findAll,
  findById,
  addSale,
};