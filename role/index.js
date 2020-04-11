var express = require('express');
var router = express.Router();
var roleController = require('./role.controller');

router.post('/get', roleController.get);

module.exports = router;