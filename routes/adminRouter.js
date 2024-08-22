const express = require('express');
const { displayUsers, userWithId } = require('../controllers/adminSide/usersListController');
const { adminAllProducts, adminProductWithId, addProduct, editProduct, deleteProduct } = require('../controllers/adminSide/adminProductController');
const { displayOrders } = require('../controllers/adminSide/adminOrderController');
const { status } = require('../controllers/adminSide/statusController');
const { adminLogin } = require('../controllers/adminSide/adminLoginController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.post('/login', adminLogin)

router.get('/users', checkAuth, displayUsers);

router.get('/users/:id', userWithId);

router.get('/products', adminAllProducts);

router.get('/products/:id', adminProductWithId);

router.post('/products', addProduct);

router.put('/products/:id', editProduct);

router.delete('/products/:id', deleteProduct);

router.get('/orders', displayOrders);

router.get('/status', status);

module.exports = router;