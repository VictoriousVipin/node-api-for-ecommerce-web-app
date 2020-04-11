const fs = require('fs');
var CartService = require('./cart.service');
exports.create = function(req, res) {
    var data = req.body;
    console.log("Controller", data);
    CartService.createCart(data).then(function(product){
        res.send(product);
    }, function(error){
        res.send(error);
    });
};

exports.get = function(req, res) {
    console.log("cart service req", req.body);
    CartService.getCart({email: req.body.email, isActive: req.body.isActive}).then(function(cart){
        console.log("cart controller", cart);
        res.send(cart);
    }, function(error){
        res.send(error);
    });
};

exports.update = function(req, res) {
    var body = req.body;
    CartService.updateCart(body).then(function(cart){
        res.send(cart);
    }, function(error){
        res.send(error);
    });
};

// exports.listOne = function(req, res) {
//     var id = req.params.id;
//     CartService.getOneProduct(id).then(function(product){
//         res.send(product);
//     }, function(error){
//         res.send(error);
//     });
// };



// exports.delete = function(req, res) {
//     var obj = req.body;
//     CartService.deleteProduct(obj)
//     .on('DELETED', function() {
//         res.send({
//             message: "Successfully Deleted."
//         });
//     })
//     .on('NO_SUCH_PRODUCT', function() {
//         res.send({
//             message: "Allready Deleted."
//         });
//     })
//     .on('ERROR', function() {
//         res.send({
//             message: "Some error occured in deletion."
//         });
//     });
// };

// exports.addAll = function(req, res) {
//     CartService.addAllProduct()
//     .on('ADDED', function() {
//         res.send({
//             message: "Successfully Added."
//         });
//     })
//     .on('ERROR', function() {
//         res.send({
//             message: "Some error occured while adding all products."
//         });
//     });
// };