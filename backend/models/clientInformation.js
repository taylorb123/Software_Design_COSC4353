const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientInformation = new Schema({
    full_name: { type: String, required: true},
    address1: { type: String, required: true},
    address2: { type: String, required: false},
    city: { type: String, required: true},
    state: { type: String, required: true},
    zip: { type: String, required: true},
    username: { type: String, required: true}}


    // username: { type: String, required: true, unique: true, minlength: 8 },
    // password: { type: String, required: true}}
);

module.exports = mongoose.model('clientInformation', clientInformation);