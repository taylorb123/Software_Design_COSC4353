const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 8 },
    password: { type: String, required: true, minlength: 8 }}
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);