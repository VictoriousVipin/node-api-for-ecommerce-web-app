var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json());
router.use('/product', require('./product'));
router.use('/user', require('./user'));
router.use('/role', require('./role'));
router.use('/cart', require('./cart'));

module.exports = router;