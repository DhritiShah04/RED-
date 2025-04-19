const db = require('../config/db');

exports.createSeller = (req, res) => {
  const { seller_name, seller_email, seller_password, seller_company_name, seller_company_description } = req.body;
  const query = `INSERT INTO user_seller (seller_name, seller_email, seller_password, seller_company_name, seller_company_description)
                 VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [seller_name, seller_email, seller_password, seller_company_name, seller_company_description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ seller_id: result.insertId });
  });
};

exports.getAllSellers = (req, res) => {
  db.query('SELECT * FROM user_seller', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

exports.getSellerById = (req, res) => {
  db.query('SELECT * FROM user_seller WHERE seller_id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows[0]);
  });
};

exports.updateSeller = (req, res) => {
  const { seller_name, seller_email, seller_company_name, seller_company_description } = req.body;
  const sql = 'UPDATE user_seller SET seller_name=?, seller_email=?, seller_company_name=?, seller_company_description=? WHERE seller_id=?';
  db.query(sql, [seller_name, seller_email, seller_company_name, seller_company_description, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Seller updated' });
  });
};

exports.deleteSeller = (req, res) => {
  db.query('DELETE FROM user_seller WHERE seller_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Seller deleted' });
  });
};