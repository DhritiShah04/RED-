const db = require('../db');

const Buyer = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO user_buyer 
      (buyer_name, buyer_email, buyer_password, buyer_phone_number, buyer_address, buyer_pincode) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
      data.name,
      data.email,
      data.password,
      data.phone_number,
      data.address,
      data.pincode
    ], callback);
  },

  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM user_buyer WHERE buyer_email = ?';
    db.query(sql, [email], callback);
  }
};

module.exports = Buyer;
