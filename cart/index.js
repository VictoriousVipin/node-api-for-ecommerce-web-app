var express = require('express');
var router = express.Router();
var cartController = require('./cart.controller');
var checkAuthToken = require('../authCheck.service');
router.post('/create', checkAuthToken.checkToken, cartController.create);
router.post('/get', cartController.get);
router.put('/update', checkAuthToken.checkToken, cartController.update);
// router.get('/list/:id', productController.listOne);
// router.delete('/delete', checkAuthToken.checkToken, productController.delete);
// router.get('/addAll', productController.addAll);

module.exports = router;