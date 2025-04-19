const db = require('../config/db');

exports.createOrderItem = (req, res) => {
  const { order_id, product_id, quantity, price } = req.body;
  const query = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;
  db.query(query, [order_id, product_id, quantity, price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId });
  });
};

exports.getOrderItemById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM order_items WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.updateOrderItem = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE order_items SET ? WHERE id = ?', [data, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order item updated successfully' });
  });
};

exports.deleteOrderItem = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM order_items WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order item deleted successfully' });
  });
};