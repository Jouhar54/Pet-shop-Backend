const express = require('express');
const { displayUsers, userWithId, deleteUser } = require('../controllers/adminSide/usersListController');
const { adminAllProducts, adminProductWithId, addProduct, editProduct, deleteProduct } = require('../controllers/adminSide/adminProductController');
const { displayOrders } = require('../controllers/adminSide/adminOrderController');
const { status } = require('../controllers/adminSide/statusController');
const { adminLogin } = require('../controllers/adminSide/adminLoginController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.post('/login', adminLogin)

// Handling the users
router.get('/users', checkAuth, displayUsers);
router.get('/users/:id',checkAuth, userWithId);
router.delete('/users/:id',checkAuth, deleteUser);

// Handling the Products
router.get('/products',checkAuth, adminAllProducts);
router.get('/products/:id',checkAuth, adminProductWithId);
router.post('/products',checkAuth, addProduct);
router.put('/products/:id',checkAuth, editProduct);
router.delete('/products/:id',checkAuth, deleteProduct);

router.get('/orders',checkAuth, displayOrders);

router.get('/status',checkAuth, status);

module.exports = router;