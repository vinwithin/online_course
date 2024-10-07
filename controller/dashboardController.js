const refreshToken = require("./refreshToken");
const CourseModel = require('../model/Course')

const dashboard = async (req, res) => {
    const courses = CourseModel.find();
    res.render('admin/dashboard', {courses})
}

module.exports = { dashboard }