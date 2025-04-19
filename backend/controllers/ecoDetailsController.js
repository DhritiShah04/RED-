const db = require('../config/db');

exports.createEcoDetails = (req, res) => {
  const { product_id, is_recyclable, is_biodegradable, is_reusable, uses_organic_materials, carbon_footprint_score, is_plastic_packaging, is_certified } = req.body;
  const query = `INSERT INTO eco_details (product_id, is_recyclable, is_biodegradable, is_reusable, uses_organic_materials, carbon_footprint_score, is_plastic_packaging, is_certified)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [product_id, is_recyclable, is_biodegradable, is_reusable, uses_organic_materials, carbon_footprint_score, is_plastic_packaging, is_certified], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ eco_id: result.insertId });
  });
};

exports.getAllEcoDetails = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM eco_details WHERE eco_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.updateEcoDetails = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE eco_details SET ? WHERE eco_id = ?', [data, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Eco details updated successfully' });
  });
};

exports.deleteEcoDetails = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM eco_details WHERE eco_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Eco details deleted successfully' });
  });
};