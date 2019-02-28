const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String},
    email: { type: String, required: true, unique: true},
    password: {type: String, required: false},
    // createdOn: {type: Date, default: Date.now},
    isSuperAdmin: {type: Boolean, default: false},
});

const User = mongoose.model('User', userSchema);

module.exports = User
