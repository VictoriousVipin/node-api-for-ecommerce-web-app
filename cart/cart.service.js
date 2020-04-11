var EventEmitter = require('events');
var CartModel = require('./cart.model');

exports.createCart = function(data) {
    return new Promise(function(resolve, reject){
        var cartData = new CartModel(data);
        console.log("service", cartData);
        cartData.save().then(function(product){
            // console.log('Product inserted', product);
            resolve(product);
        }, function(error){
            // console.log('Error in product insertion', error);
            reject(error);
        });
    });
}

exports.getCart = function(data) {
    console.log("cart service req", data);
    return new Promise(function(resolve, reject){
        CartModel.find({email: data.email, isActive: data.isActive}, {__v: 0, _id: 0}).then(function(cart){
            console.log("cart service", cart);
            resolve({data: cart});
        }, function(error){
            // console.log('Error in retrieving products', error);
            reject(error);
        });
    });
}

exports.updateCart = function(body) {
    return new Promise(function(resolve, reject){
        CartModel.findOneAndUpdate({email: body.email, isActive: true}, body, {new: true}).then(function(cart){
            // console.log('Listing all products', products);
            resolve({data: cart});
        }, function(error){
            // console.log('Error in retrieving products', error);
            reject(error);
        });
    });
}
// exports.getOneProduct = function(id) {
//     return new Promise(function(resolve, reject){
//         CartModel.find({productid: id}, {__v: 0, _id: 0}).then(function(products){
//             // console.log('Listing all products', products);
//             resolve({data: products});
//         }, function(error){
//             // console.log('Error in retrieving products', error);
//             reject(error);
//         });
//     });
// }



// exports.deleteProduct = function(data) {
//     var emitter = new EventEmitter();

//     CartModel.deleteOne(data).then(function(result){
//         if(result['deletedCount'] == 0) {
//             emitter.emit('NO_SUCH_PRODUCT');
//         } else {
//             emitter.emit('DELETED');
//         }
//         console.log("Result:-", result);
        
//     }, function(error){
//         emitter.emit('ERROR');
//     });
    
//     return emitter;
// }

// exports.addAllProduct = function() {
//     var emitter = new EventEmitter();
//     var data = productsData.getProductData();
//     data.map(item => {
//         var productData = new CartModel(item);
//         productData.save().then(function(product){
//             // console.log('Product inserted', product);
//         }, function(error){
//             emitter.emit('ERROR');
//         }); 
//     });
//     emitter.emit('ADDED');

//     return emitter;
// };