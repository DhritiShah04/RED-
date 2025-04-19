const db = require('../config/db');

exports.createOrder = (req, res) => {
  const { buyer_id, total_amount, status } = req.body;
  const query = `INSERT INTO orders (buyer_id, total_amount, status) VALUES (?, ?, ?)`;
  db.query(query, [buyer_id, total_amount, status], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ order_id: result.insertId });
  });
};

exports.getOrderById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM orders WHERE order_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE orders SET ? WHERE order_id = ?', [data, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order updated successfully' });
  });
};

exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM orders WHERE order_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order deleted successfully' });
  });
};