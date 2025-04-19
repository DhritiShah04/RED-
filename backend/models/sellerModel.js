const db = require('../db');

const Seller = {
  create: (data, callback) => {
    const sql = 'INSERT INTO user_seller (seller_name, seller_email, seller_password, seller_company_name, seller_company_description) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [data.name, data.email, data.password, data.companyName, data.description], callback);
  },

  findByEmail: (email, callback) => {
    db.query('SELECT * FROM user_seller WHERE seller_email = ?', [email], callback);
  }
};

module.exports = Seller;