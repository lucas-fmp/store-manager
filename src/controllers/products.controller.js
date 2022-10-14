const services = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await services.productsServices.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);
  
  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await services.productsServices.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const addProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await services.productsServices.addProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await services.productsServices.updateProduct(id, name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  addProduct,
  updateProduct,
};