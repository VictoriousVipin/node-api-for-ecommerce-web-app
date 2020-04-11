const fs = require('fs');
var ProductService = require('./product.service');
exports.create = function(req, res) {
    var data = req.body;
    ProductService.createProduct(data).then(function(product){
        res.send(product);
    }, function(error){
        res.send(error);
    });
};

exports.listAll = function(req, res) {
    ProductService.getAllProduct().then(function(product){
        res.send(product);
    }, function(error){
        res.send(error);
    });
};

exports.listOne = function(req, res) {
    var id = req.params.id;
    ProductService.getOneProduct(id).then(function(product){
        res.send(product);
    }, function(error){
        res.send(error);
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var body = req.body;
    ProductService.updateById(id, body).then(function(product){
        res.send(product);
    }, function(error){
        res.send(error);
    });
};

exports.delete = function(req, res) {
    var obj = req.body;
    ProductService.deleteProduct(obj)
    .on('DELETED', function() {
        res.send({
            message: "Successfully Deleted."
        });
    })
    .on('NO_SUCH_PRODUCT', function() {
        res.send({
            message: "Allready Deleted."
        });
    })
    .on('ERROR', function() {
        res.send({
            message: "Some error occured in deletion."
        });
    });
};

exports.addAll = function(req, res) {
    ProductService.addAllProduct()
    .on('ADDED', function() {
        res.send({
            message: "Successfully Added."
        });
    })
    .on('ERROR', function() {
        res.send({
            message: "Some error occured while adding all products."
        });
    });
};