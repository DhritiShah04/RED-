const db = require('../db');

const Buyer = {
  create: (data, callback) => {
    const sql = 'INSERT INTO user_buyer (buyer_name, buyer_email, buyer_password) VALUES (?, ?, ?)';
    db.query(sql, [data.name, data.email, data.password], callback);
  },

  findByEmail: (email, callback) => {
    db.query('SELECT * FROM user_buyer WHERE buyer_email = ?', [email], callback);
  }
};

module.exports = Buyer;