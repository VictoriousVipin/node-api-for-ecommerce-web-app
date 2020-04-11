var EventEmitter = require('events');
var RoleModel = require('./role.model');

exports.getRole = function (req) {
    var emitter = new EventEmitter();
    RoleModel.find({email: req.email}, {__v: 0, _id: 0}).then(function (role) {
        if (role.length) {
            emitter.emit('SUCCESS', role);
        } else {
            emitter.emit('NO_ROLE_FOUND', role);
        }
    }, function (error) {
        emitter.emit('ERROR', error);
    });

    return emitter;
}