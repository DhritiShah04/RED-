const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/sellerController');
const buyerController = require('../controllers/buyerController');
const productController = require('../controllers/productController');
const ecoDetailsController = require('../controllers/ecoDetailsController');
const orderController = require('../controllers/orderController');
const orderItemsController = require('../controllers/orderItemsController');
const rewardController = require('../controllers/rewardController');
const authController = require('../controllers/authController');

const { authenticate } = require('../middlewares/auth');
const { authorizeRole } = require('../middlewares/authorizeRole');

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


// Auth Routes
router.post('/login/buyer', authController.loginBuyer);
router.post('/login/seller', authController.loginSeller);

// Seller Routes (protected)
router.post('/sellers', sellerController.createSeller); // open for registration
router.get('/sellers', authenticate, authorizeRole('admin'), sellerController.getAllSellers);
router.get('/sellers/:id', authenticate, authorizeRole('seller'), sellerController.getSellerById);
router.put('/sellers/:id', authenticate, authorizeRole('seller'), sellerController.updateSeller);
router.delete('/sellers/:id', authenticate, authorizeRole('admin'), sellerController.deleteSeller);

// Buyer Routes (some open, some protected)
router.post('/buyers', buyerController.createBuyer); // open for registration
router.get('/buyers', authenticate, authorizeRole('admin'), buyerController.getAllBuyers);
router.get('/buyers/:id', authenticate, authorizeRole('buyer'), buyerController.getBuyerById);
router.put('/buyers/:id', authenticate, authorizeRole('buyer'), buyerController.updateBuyer);
router.delete('/buyers/:id', authenticate, authorizeRole('admin'), buyerController.deleteBuyer);
// Buyer Routes (some open, some protected)
router.post('/buyers', buyerController.createBuyer); // open for registration
router.get('/buyers', authenticate, authorizeRole('admin'), buyerController.getAllBuyers);
router.get('/buyers/:id', authenticate, authorizeRole('buyer'), buyerController.getBuyerById);
router.put('/buyers/:id', authenticate, authorizeRole('buyer'), buyerController.updateBuyer);
router.delete('/buyers/:id', authenticate, authorizeRole('admin'), buyerController.deleteBuyer);

// Product Routes (GETs are public, others protected)
router.post( "/products", authenticate, authorizeRole("seller"), upload.fields([ { name: "images", maxCount: 10 }, { name: "certification_image", maxCount: 1 }, ]), productController.createProduct );
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', authenticate, authorizeRole('seller'), productController.updateProduct);
router.delete('/products/:id', authenticate, authorizeRole('seller'), productController.deleteProduct);
router.put('/products/:id', authenticate, authorizeRole('seller'), productController.updateProduct);
router.delete('/products/:id', authenticate, authorizeRole('seller'), productController.deleteProduct);
router.get('/products/total/:id', authenticate, authorizeRole('seller'), productController.totalProducts);
router.get('/products/totalrevenue/:id', authenticate, authorizeRole('seller'), productController.totalRevenue);

// Eco Details Routes (protected)
router.post('/eco-details', authenticate, authorizeRole('seller'), ecoDetailsController.createEcoDetails);
// Eco Details Routes (protected)
router.post('/eco-details', authenticate, authorizeRole('seller'), ecoDetailsController.createEcoDetails);
router.get('/eco-details', ecoDetailsController.getAllEcoDetails);
router.put('/eco-details/:id', authenticate, authorizeRole('seller'), ecoDetailsController.updateEcoDetails);
router.delete('/eco-details/:id', authenticate, authorizeRole('seller'), ecoDetailsController.deleteEcoDetails);
router.put('/eco-details/:id', authenticate, authorizeRole('seller'), ecoDetailsController.updateEcoDetails);
router.delete('/eco-details/:id', authenticate, authorizeRole('seller'), ecoDetailsController.deleteEcoDetails);

// Orders Routes (buyer only)
router.post('/orders', authenticate, authorizeRole('buyer'), orderController.createOrder);
router.get('/orders/:id', authenticate, authorizeRole('buyer'), orderController.getOrderById);
router.put('/orders/:id', authenticate, authorizeRole('buyer'), orderController.updateOrder);
router.delete('/orders/:id', authenticate, authorizeRole('buyer'), orderController.deleteOrder);
// Orders Routes (buyer only)
router.post('/orders', authenticate, authorizeRole('buyer'), orderController.createOrder);
router.get('/orders/:id', authenticate, authorizeRole('buyer'), orderController.getOrderById);
router.put('/orders/:id', authenticate, authorizeRole('buyer'), orderController.updateOrder);
router.delete('/orders/:id', authenticate, authorizeRole('buyer'), orderController.deleteOrder);

// Order Items Routes (buyer only)
router.post('/order-items', authenticate, authorizeRole('buyer'), orderItemsController.createOrderItem);
router.get('/order-items/:id', authenticate, authorizeRole('buyer'), orderItemsController.getOrderItemById);
router.put('/order-items/:id', authenticate, authorizeRole('buyer'), orderItemsController.updateOrderItem);
router.delete('/order-items/:id', authenticate, authorizeRole('buyer'), orderItemsController.deleteOrderItem);
// Order Items Routes (buyer only)
router.post('/order-items', authenticate, authorizeRole('buyer'), orderItemsController.createOrderItem);
router.get('/order-items/:id', authenticate, authorizeRole('buyer'), orderItemsController.getOrderItemById);
router.put('/order-items/:id', authenticate, authorizeRole('buyer'), orderItemsController.updateOrderItem);
router.delete('/order-items/:id', authenticate, authorizeRole('buyer'), orderItemsController.deleteOrderItem);

// Rewards Routes (buyer only)
router.get('/rewards/:id', authenticate, authorizeRole('buyer'), rewardController.getRewardByBuyerId);
router.put('/rewards/:id', authenticate, authorizeRole('buyer'), rewardController.updateReward);
router.delete('/rewards/:id', authenticate, authorizeRole('buyer'), rewardController.deleteReward);
// Rewards Routes (buyer only)
router.get('/rewards/:id', authenticate, authorizeRole('buyer'), rewardController.getRewardByBuyerId);
router.put('/rewards/:id', authenticate, authorizeRole('buyer'), rewardController.updateReward);
router.delete('/rewards/:id', authenticate, authorizeRole('buyer'), rewardController.deleteReward);

module.exports = router;
