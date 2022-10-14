const services = require('../services');
const errorMap = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { type, message } = await services.salesServices.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);
  
  res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await services.salesServices.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const addSale = async (req, res) => {
  const bodyInput = req.body;

  const { type, message } = await services.salesServices.addSale(bodyInput);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  listSales,
  getSale,
  addSale,
};