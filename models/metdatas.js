const mongoose = require('mongoose');

const metSchema = mongoose.Schema({
    author: String,
    title: String,
    image: String,
    museum: String,
    classification: String
});

const Met = mongoose.model('metdatas', metSchema);

module.exports = Met;