var express = require('express');
var router = express.Router();
var productController = require('./product.controller');
var checkAuthToken = require('../authCheck.service');
router.post('/create', checkAuthToken.checkToken, productController.create);
router.get('/list', productController.listAll);
router.get('/list/:id', productController.listOne);
router.put('/update/:id', checkAuthToken.checkToken, productController.update);
router.delete('/delete', checkAuthToken.checkToken, productController.delete);
router.get('/addAll', productController.addAll);

module.exports = router;