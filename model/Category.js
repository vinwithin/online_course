const mongoose = require('mongoose');

const Category = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

});

Categories = mongoose.model('categories', Category);
module.exports = Category;