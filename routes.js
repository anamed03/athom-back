const express = require('express');
const { getUsers, editUser, deleteUser, addUser } = require('./users.js');
const { getProducts, editProduct, deleteProduct, addProduct } = require('./products.js');

const router = express.Router();

router.get('/users', getUsers);
router.put('/users/:id', editUser);
router.delete('/users/:id', deleteUser);
router.post('/users', addUser);

router.get('/productos', getProducts);
router.put('/productos/:id', editProduct);
router.delete('/productos/:id', deleteProduct);
router.post('/productos', addProduct);

module.exports = { setupRoutes: (app) => app.use('/api', router) };
