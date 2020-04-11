var jwt = require('jsonwebtoken');
var configData = require('./common/config');
exports.checkAdminToken = function(req, res, next){
    var authtoken = req.get('authtoken');
    var secretKey = configData.config.adminSecretKey;
    console.log("API_REQUEST", authtoken);
    if(authtoken) {
        jwt.verify(authtoken, secretKey, function(err, token){
            if(err) {
                res.status(403).send({code: 403, message: 'You are not authorized to do this action'});
            } else {
                next();
            }
        });
    } else {
        res.status(400).send({code: 400, message: 'No token available'});
    }
}

exports.checkToken = function(req, res, next){
    var authtoken = req.get('authtoken');
    var adminSecretKey = configData.config.adminSecretKey;
    var userSecretKey = configData.config.userSecretKey;
    
    console.log("API_REQUEST", authtoken);
    if(authtoken) {
        jwt.verify(authtoken, adminSecretKey, (err, token) => {
            if(err) {
                jwt.verify(authtoken, userSecretKey, (err, token) => {
                    if(err) {
                        res.status(403).send({code: 403, message: 'You are not authorized to do this action'});     
                    } else {
                        next();
                    }
                })
            } else {
                next();
            }
        });
    } else {
        res.status(400).send({code: 400, message: 'No token available'});
    }
}