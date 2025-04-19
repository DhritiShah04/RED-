const db = require("../config/db");

const Product = {
  create: async (data, callback) => {
    try {
      const sql = `
        INSERT INTO products (
          product_seller_id,
          product_name,
          product_short_description,
          product_description,
          product_price,
          product_stock_quantity,
          product_image_url,
          product_eco_rating,
          is_recyclable,
          is_biodegradable,
          is_reusable,
          uses_organic_materials,
          carbon_footprint_score,
          is_plastic_packaging,
          is_certified,
          certification_urls,
          durability,
          product_created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;
      const values = [
        data.product_seller_id, 
        data.product_name, 
        data.product_short_description, 
        data.product_description, 
        data.product_price, 
        data.product_stock_quantity, 
        data.product_image_url, 
        data.product_eco_rating, 
        data.is_recyclable, 
        data.is_biodegradable, 
        data.is_reusable, 
        data.uses_organic_materials, 
        data.carbon_footprint_score, 
        data.is_plastic_packaging, 
        data.is_certified, 
        data.certification_urls, 
        data.durability,
      ];

      db.query(sql, values, callback);
    } catch (error) {
      console.error("Error inserting product:", error);
      callback(error);
    }
  },

  findById: (id, callback) => {
    db.query("SELECT * FROM products WHERE product_id = ?", [id], callback);
  },
};

module.exports = Product;
