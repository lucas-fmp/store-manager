const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async (product) => {
  const columns = Object.keys(product).map((key) => `${key}`).join(', ');
  const placeholders = Object.keys(product).map((_key) => '?').join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const updateById = async (id, name) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );

  return findById(id);
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteProduct,
};