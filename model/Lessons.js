const mongoose = require('mongoose');

const Lessons = new mongoose.Schema({
    course_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        required: true
    },

});

LessonsModel = mongoose.model('lessons', Lessons);
module.exports = LessonsModel;