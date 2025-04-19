const db = require('../db');

const OrderItem = {
  create: (data, callback) => {
    const sql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    db.query(sql, [data.orderId, data.productId, data.quantity, data.price], callback);
  },

  getByOrderId: (orderId, callback) => {
    db.query('SELECT * FROM order_items WHERE order_id = ?', [orderId], callback);
  }
};

module.exports = OrderItem;