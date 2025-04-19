const db = require('../config/db');
const { generateToken } = require('../utils/jwt');

exports.loginBuyer = async (req, res) => {
  const { buyer_email, buyer_password } = req.body;

  db.query('SELECT * FROM user_buyer WHERE buyer_email = ?', [buyer_email], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    if (buyer_password !== user.buyer_password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken({ id: user.buyer_id }, 'buyer');
    res.json({ token, buyer_id: user.buyer_id });
  });
};

exports.loginSeller = async (req, res) => {
  const { seller_email, seller_password } = req.body;

  db.query('SELECT * FROM user_seller WHERE seller_email = ?', [seller_email], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    if (seller_password !== user.seller_password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken({ id: user.seller_id }, 'seller');
    res.json({ token, seller_id: user.seller_id });
  });
};