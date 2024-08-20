const express = require('express');
const { displayUsers, userWithId } = require('../controllers/adminSide/usersListController');
const { adminAllProducts, adminProductWithId, addProduct, editProduct, deleteProduct } = require('../controllers/adminSide/adminProductController');

const router = express.Router();

// router.post('/login', )

router.get('/users', displayUsers);

router.get('/users/:id', userWithId);

router.get('/products', adminAllProducts);

router.get('/products/:id', adminProductWithId);

router.post('/products', addProduct);

router.put('/products/:id', editProduct);

router.delete('/products/:id', deleteProduct);

module.exports = router;