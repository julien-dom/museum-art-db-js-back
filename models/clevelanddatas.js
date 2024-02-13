const mongoose = require('mongoose');

const clevelandSchema = mongoose.Schema({
    author: String,
    title: String,
    image: String,
    museum: String,
    classification: String
});

const Cleveland = mongoose.model('clevelanddatas', clevelandSchema);

module.exports = Cleveland;