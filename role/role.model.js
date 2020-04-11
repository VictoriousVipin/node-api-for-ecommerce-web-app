var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var roleSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    }
});

module.exports = mongoose.model('role', roleSchema);