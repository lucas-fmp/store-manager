const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleSchema = Joi.object({
  productId: idSchema.label('productId'),
  quantity: idSchema.label('quantity'),
});

const addSalesSchema = Joi.array().items(saleSchema);

module.exports = {
  addProductSchema,
  saleSchema,
  addSalesSchema,
};