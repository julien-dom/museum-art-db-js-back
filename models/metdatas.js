const mongoose = require('mongoose');

const metSchema = mongoose.Schema({
    objectID: Number,
    artistDisplayName: String,
    title: String,
    primaryImageSmall: String,
    museum: String,
    objectName: String,
    objectDate: String,
    dimensions: String,
    medium: String
});

const Met = mongoose.model('metdatas', metSchema);

module.exports = Met;