const connection = require('./connection');

const insert = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (product_id, quantity) VALUE (?, ?)',
    [...Object.values(sale)],
  );

  return insertId;
};

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT
      s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      sales AS s
    INNER JOIN
      sales_products AS sp
    ON s.id = sp.sale_id`,
  );
  return sales;
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      sales AS s
    INNER JOIN
      sales_products AS sp
    ON
      s.id = sp.sale_id
    WHERE
      s.id = ?`,
    [saleId],
  );
  return sale;
};

module.exports = {
  insert,
  findAll,
  findById,
};