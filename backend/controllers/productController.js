const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
require("dotenv").config();
const Product = require("../models/productModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
}).array("product_images", 10);

exports.createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_short_description,
      product_description,
      product_price,
      product_stock_quantity,
      product_image_url,
      is_recyclable,
      is_biodegradable,
      is_reusable,
      uses_organic_materials,
      is_plastic_packaging,
      is_certified,
      certification_urls,
      durability,
    } = req.body;
    const product_seller_id = req.body.seller_id;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const ecoRatingPrompt = `Based on the following product description, classify its eco rating as "High", "Moderate", or "Low":
    Description: ${product_description}
    Respond with only one word: High, Moderate, or Low.`;

    const carbonFootprintPrompt = `Based on the following product description or product name, estimate the carbon footprint score of the product on a scale of 1-10 (with 1 being low and 10 being high):
    Name: ${product_name}
    Description: ${product_description}
    Respond with only a number between 1 and 10.`;

    const ecoRatingResult = await model.generateContent(ecoRatingPrompt);
    const ecoRatingResponse = await ecoRatingResult.response;
    let ecoRating = ecoRatingResponse.text().trim();

    ecoRating = ecoRating.charAt(0).toUpperCase() + ecoRating.slice(1).toLowerCase();

    const carbonFootprintResult = await model.generateContent(carbonFootprintPrompt);
    const carbonFootprintResponse = await carbonFootprintResult.response;
    let carbonFootprintScore = carbonFootprintResponse.text().trim();

    carbonFootprintScore = parseFloat(carbonFootprintScore);

    const productData = {
      product_seller_id,
      product_name,
      product_short_description,
      product_description,
      product_price,
      product_stock_quantity,
      product_image_url: JSON.stringify(product_image_url), // Stringify the array
      product_eco_rating: ecoRating,
      is_recyclable,
      is_biodegradable,
      is_reusable,
      uses_organic_materials,
      carbon_footprint_score: carbonFootprintScore,
      is_plastic_packaging,
      is_certified,
      certification_urls: JSON.stringify(certification_urls), // Stringify the array
      durability,
    };

    Product.create(productData, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create product", error: err.message });
      }

      res.status(201).json({
        message: "Product created successfully",
        productId: result.insertId,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate eco rating or create product", error: error.message });
  }
};


// Get all products
exports.getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM products WHERE product_id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results[0]);
    }
  );
};

// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query("UPDATE products SET ? WHERE product_id = ?", [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Product updated successfully");
  });
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE product_id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Product deleted successfully");
  });
};

exports.totalProducts = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT COUNT(*) AS product_count, SUM(product_stock_quantity) AS total_stock_quantity FROM products WHERE product_seller_id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send({ error: err.message });
      res.status(200).json(results[0]);
    }
  );
};

exports.totalRevenue = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT 
          SUM(oi.quantity * oi.price) AS total_revenue
      FROM 
          products p
      LEFT JOIN 
          order_items oi ON oi.product_id = p.product_id
      LEFT JOIN 
          orders o ON oi.order_id = o.order_id
      WHERE 
          p.product_seller_id = 1;`,
    [id],
    (err, results) => {
      if (err) return res.status(500).send({ error: err.message });
      res.status(200).json(results[0]);
    }
  );
};

exports.getProductsBySellerId = (req, res) => {
  const sellerId = req.params.sellerId;
  
  const sql = `
    SELECT * FROM products 
    WHERE product_seller_id = ? 
    ORDER BY product_created_at DESC
  `;
  
  db.query(sql, [sellerId], (err, results) => {
    if (err) {
      console.error("Error fetching seller products:", err);
      return res.status(500).json({ 
        status: false, 
        message: "Failed to retrieve seller products",
        error: err.message
      });
    }
    
    return res.status(200).json({ 
      status: true,
      message: "Seller products retrieved successfully",
      data: results 
    });
  });
},

// Get eco-friendly products
exports.getEcoFriendlyProducts = (req, res) => {
  const minRating = req.query.rating || 4.0; // Default to 4.0 if not provided
  
  const sql = `
    SELECT * FROM products 
    WHERE product_eco_rating >= ? 
    ORDER BY product_eco_rating DESC
  `;
  
  db.query(sql, [minRating], (err, results) => {
    if (err) {
      console.error("Error fetching eco-friendly products:", err);
      return res.status(500).json({ 
        status: false, 
        message: "Failed to retrieve eco-friendly products",
        error: err.message
      });
    }
    
    return res.status(200).json({ 
      status: true,
      message: "Eco-friendly products retrieved successfully",
      data: results 
    });
  });
},

// Get products by multiple filters
exports.getFilteredProducts = (req, res) => {
  const {
    is_recyclable,
    is_biodegradable,
    is_reusable,
    uses_organic_materials,
    min_eco_rating,
    max_price,
    is_certified
  } = req.query;
  
  let sql = "SELECT * FROM products WHERE 1=1";
  const params = [];
  
  if (is_recyclable === 'true') {
    sql += " AND is_recyclable = 1";
  }
  
  if (is_biodegradable === 'true') {
    sql += " AND is_biodegradable = 1";
  }
  
  if (is_reusable === 'true') {
    sql += " AND is_reusable = 1";
  }
  
  if (uses_organic_materials === 'true') {
    sql += " AND uses_organic_materials = 1";
  }
  
  if (is_certified === 'true') {
    sql += " AND is_certified = 1";
  }
  
  if (min_eco_rating) {
    sql += " AND product_eco_rating >= ?";
    params.push(parseFloat(min_eco_rating));
  }
  
  if (max_price) {
    sql += " AND product_price <= ?";
    params.push(parseFloat(max_price));
  }
  
  sql += " ORDER BY product_eco_rating DESC";
  
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching filtered products:", err);
      return res.status(500).json({ 
        status: false, 
        message: "Failed to retrieve filtered products",
        error: err.message
      });
    }
    
    return res.status(200).json({ 
      status: true,
      message: "Filtered products retrieved successfully",
      data: results 
    });
  });
},

// Get product stats for seller dashboard
exports.getProductStats = (req, res) => {
  const sellerId = req.params.sellerId;
  
  // This combines multiple queries for dashboard stats
  const sqlProductCount = "SELECT COUNT(*) as totalProducts FROM products WHERE product_seller_id = ?";
  const sqlAvgEcoScore = "SELECT AVG(product_eco_rating) as avgEcoScore FROM products WHERE product_seller_id = ?";
  const sqlCertifiedCount = "SELECT COUNT(*) as certifiedProducts FROM products WHERE product_seller_id = ? AND is_certified = 1";
  const sqlProductList = `
    SELECT 
      product_id,
      product_name,
      product_eco_rating as ecoScore,
      product_price as price,
      product_stock_quantity as stock,
      is_recyclable, 
      is_biodegradable, 
      is_reusable,
      uses_organic_materials,
      carbon_footprint_score
    FROM products 
    WHERE product_seller_id = ?
  `;
  
  db.query(sqlProductCount, [sellerId], (err, countResults) => {
    if (err) {
      console.error("Error fetching product count:", err);
      return res.status(500).json({ status: false, message: "Error fetching stats", error: err.message });
    }
    
    db.query(sqlAvgEcoScore, [sellerId], (err, ecoResults) => {
      if (err) {
        console.error("Error fetching eco score:", err);
        return res.status(500).json({ status: false, message: "Error fetching stats", error: err.message });
      }
      
      db.query(sqlCertifiedCount, [sellerId], (err, certResults) => {
        if (err) {
          console.error("Error fetching certified count:", err);
          return res.status(500).json({ status: false, message: "Error fetching stats", error: err.message });
        }
        
        db.query(sqlProductList, [sellerId], (err, productResults) => {
          if (err) {
            console.error("Error fetching product list:", err);
            return res.status(500).json({ status: false, message: "Error fetching stats", error: err.message });
          }
          
          // Format products with eco tags
          const products = productResults.map(product => {
            const tags = [];
            
            if (product.is_recyclable) tags.push("Recyclable");
            if (product.is_biodegradable) tags.push("Biodegradable");
            if (product.is_reusable) tags.push("Reusable");
            if (product.uses_organic_materials) tags.push("Organic Materials");
            
            return {
              ...product,
              tags
            };
          });
          
          return res.status(200).json({
            status: true,
            message: "Product stats retrieved successfully",
            data: {
              totalProducts: countResults[0].totalProducts,
              avgEcoScore: parseFloat(ecoResults[0].avgEcoScore || 0).toFixed(2),
              certifiedProducts: certResults[0].certifiedProducts,
              products
            }
          });
        });
      });
    });
  });
}
