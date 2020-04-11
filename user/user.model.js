var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Number,
        unique: true
    },
    userid:{
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: new Date()
    },
    isVerifed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user'
    },
    location: {
        type: String,
        default: 'Gurugram'
    }

});

module.exports = mongoose.model('user', userSchema);