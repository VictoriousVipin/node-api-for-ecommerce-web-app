var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cartSchema = new Schema({
    cartId: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    products: [{
        productid: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        brand: {
            type: String,
            require: true
        },
        image: {
            type: String
        },
        price: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
            require: true,
            default: 1
        }
    }],
    isActive: {
        type: Boolean,
        require: true,
        default: true
    }
});

module.exports = mongoose.model('cart', cartSchema);