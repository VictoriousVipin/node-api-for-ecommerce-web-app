var express = require('express');
var router = express.Router();
var userController = require('./user.controller');
var checkAuthToken = require('../authCheck.service');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/listall', checkAuthToken.checkToken, userController.listall);
router.get('/verify-user', userController.verifyUser);

module.exports = router;