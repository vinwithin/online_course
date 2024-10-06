const mongoose = require('mongoose');

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
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },

});

CourseModel = mongoose.model('courses', Course);
module.exports = CourseModel;