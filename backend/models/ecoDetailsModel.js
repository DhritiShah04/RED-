const db = require('../db');

const EcoDetails = {
  create: (data, callback) => {
    const sql = 'INSERT INTO eco_details (product_id, is_recyclable, is_biodegradable, is_reusable, uses_organic_materials, carbon_footprint_score, is_plastic_packaging, is_certified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [data.productId, data.recyclable, data.biodegradable, data.reusable, data.organic, data.carbonScore, data.plasticPackaging, data.certified], callback);
  },

  findByProductId: (productId, callback) => {
    db.query('SELECT * FROM eco_details WHERE product_id = ?', [productId], callback);
  }
};

module.exports = EcoDetails;