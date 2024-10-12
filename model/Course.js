const mongoose = require('mongoose');
const Categories = require("../model/Category")

const Course = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: Categories,  // This refers to the Categories model
        required: true,
    },

});

CourseModel = mongoose.model('courses', Course);
module.exports = CourseModel;