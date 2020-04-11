var EventEmitter = require('events');
var UserModel = require('./user.model');
var mailer = require('../mailer');
var crypto = require('crypto');
var algorithm = "aes-256-ctr";
var secretKey = "Victorious_Vipin";
var jwt = require('jsonwebtoken');
var configData = require('../common/config');

exports.registerUser = function (data) {
    var emitter = new EventEmitter();
    if (data && data.email && data.password) {
        if (validateEmail(data.email)) {
            var encrypted = crypto.createCipher(algorithm, data.password);
            data.password = encrypted.update(secretKey, "utf8", "hex");
            data.userId = Date.now();
            data.userid = Date.now();
            var userData = new UserModel(data);
            userData.save().then(function (user) {
                var token = jwt.sign({ email: data.email }, secretKey, { expiresIn: 60 * 60 });
                let linkToVerifyUser = "https://vipinnodefeb1.herokuapp.com/user/verify-user?token="+token+"&email="+data.email;
                mailer.sendMail(data.email, linkToVerifyUser).on('DONE', function () {
                    emitter.emit('SUCCESS');
                });
                // Send welcome mail
            }, function (error) {
                if (error.code === 11000) {
                    emitter.emit('DUPLICATE');
                } else {
                    emitter.emit('ERROR');
                }
            });
        } else {
            setTimeout(function () {
                emitter.emit('INVALID_EMAIL');
            }, 1);
        }

    } else {
        setTimeout(function () {
            emitter.emit('INCOMPLETE_DATA');
        }, 1);
    }

    return emitter;
}

exports.loginUser = function (data) {
    var emitter = new EventEmitter();
    if (data && data.email && data.password) {
        if (validateEmail(data.email)) {
            //var encrypted = crypto.createCipher(algorithm, data.password);
            //data.password = encrypted.update(secretKey, "utf8", "hex");
            UserModel.find(data).then(function (user) {
                if (user.length) {
                    secretKey = user[0].role === "admin" ? configData.config.adminSecretKey : configData.config.userSecretKey;;
                    var token = jwt.sign({ email: data.email }, secretKey, { expiresIn: 15 * 60 });
                    emitter.emit('SUCCESS', {token, user});
                } else {
                    emitter.emit('USER_NOT_FOUND');
                }
            }, function (error) {
                emitter.emit('ERROR');
            });
        } else {
            setTimeout(function () {
                emitter.emit('INVALID_EMAIL');
            }, 1);
        }

    } else {
        setTimeout(function () {
            emitter.emit('INCOMPLETE_DATA');
        }, 1);
    }

    return emitter;
}

exports.getAllUser = function () {
    var emitter = new EventEmitter();
    UserModel.find({}).then(function (user) {
        if (user.length) {
            emitter.emit('SUCCESS', user);
        } else {
            emitter.emit('NO_USER_FOUND');
        }
    }, function (error) {
        emitter.emit('ERROR');
    });

    return emitter;
}

exports.verifyUser = function (data) {
    var emitter = new EventEmitter();
    jwt.verify(data.token, secretKey, function(err, token){
        if(err && err.expiredAt) {
            setTimeout(function(){
                emitter.emit('EXPIRED');
            },0);
        } else {
            UserModel.update({email: data.email}, {$set: {isVerifed: true}}).then(function(users){
                emitter.emit('SUCCESS');
            }, function(error){
                emitter.emit('ERROR', error);
            });
        }
    });

    return emitter;
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}