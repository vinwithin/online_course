const refreshToken = require("./refreshToken");
const CourseModel = require('../model/Course')

const dashboard = async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.render('admin/dashboard', { courses: courses, name: req.name });
      } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Error fetching courses');
      }
}

module.exports = { dashboard }