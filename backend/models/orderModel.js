const db = require('../db');

const Order = {
  create: (data, callback) => {
    const sql = 'INSERT INTO orders (buyer_id, total_amount, status) VALUES (?, ?, ?)';
    db.query(sql, [data.buyerId, data.totalAmount, data.status], callback);
  },

  getByBuyerId: (buyerId, callback) => {
    db.query('SELECT * FROM orders WHERE buyer_id = ?', [buyerId], callback);
  }
};

module.exports = Order;