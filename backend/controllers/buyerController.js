const db = require('../config/db');

exports.createBuyer = (req, res) => {
  const { 
    buyer_name, 
    buyer_email, 
    buyer_password, 
    buyer_phone_number, 
    buyer_address, 
    buyer_pincode 
  } = req.body;

  const query = `
    INSERT INTO user_buyer 
    (buyer_name, buyer_email, buyer_password, buyer_phone_number, buyer_address, buyer_pincode) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query, 
    [buyer_name, buyer_email, buyer_password, buyer_phone_number, buyer_address, buyer_pincode], 
    (err, result) => {
      if (err) {
        console.error("Error inserting buyer:", err);
        return res.status(500).send({ error: "Database insertion failed" });
      }
      res.status(201).send({ buyer_id: result.insertId });
    }
  );
};

exports.getAllBuyers = (req, res) => {
  db.query('SELECT * FROM user_buyer', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getBuyerById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM user_buyer WHERE buyer_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.updateBuyer = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE user_buyer SET ? WHERE buyer_id = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Buyer updated successfully');
  });
};

exports.deleteBuyer = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM user_buyer WHERE buyer_id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Buyer deleted successfully');
  });
};