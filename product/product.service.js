var EventEmitter = require('events');
var ProductModel = require('./product.model');
var productsData  = require('./data/products');

exports.createProduct = function(data) {
    return new Promise(function(resolve, reject){
        var productData = new ProductModel(data);
        productData.save().then(function(product){
            // console.log('Product inserted', product);
            resolve(product);
        }, function(error){
            // console.log('Error in product insertion', error);
            reject(error);
        });
    });
}

exports.getAllProduct = function() {
    return new Promise(function(resolve, reject){
        ProductModel.find({}, {__v: 0, _id: 0}).then(function(products){
            // console.log('Listing all products', products);
            resolve({data: products});
        }, function(error){
            // console.log('Error in retrieving products', error);
            reject(error);
        });
    });
}

exports.getOneProduct = function(id) {
    return new Promise(function(resolve, reject){
        ProductModel.find({productid: id}, {__v: 0, _id: 0}).then(function(products){
            // console.log('Listing all products', products);
            resolve({data: products});
        }, function(error){
            // console.log('Error in retrieving products', error);
            reject(error);
        });
    });
}

exports.updateById = function(id, body) {
    return new Promise(function(resolve, reject){
        ProductModel.findOneAndUpdate({productid: id}, body).then(function(products){
            // console.log('Listing all products', products);
            resolve({data: products});
        }, function(error){
            // console.log('Error in retrieving products', error);
            reject(error);
        });
    });
}

exports.deleteProduct = function(data) {
    var emitter = new EventEmitter();

    ProductModel.deleteOne(data).then(function(result){
        if(result['deletedCount'] == 0) {
            emitter.emit('NO_SUCH_PRODUCT');
        } else {
            emitter.emit('DELETED');
        }
        console.log("Result:-", result);
        
    }, function(error){
        emitter.emit('ERROR');
    });
    
    return emitter;
}

exports.addAllProduct = function() {
    var emitter = new EventEmitter();
    var data = productsData.getProductData();
    data.map(item => {
        var productData = new ProductModel(item);
        productData.save().then(function(product){
            // console.log('Product inserted', product);
        }, function(error){
            emitter.emit('ERROR');
        }); 
    });
    emitter.emit('ADDED');

    return emitter;
};