const refreshToken = require("./refreshToken");
const CourseModel = require('../model/Course')
const Categories = require("../model/Category")

const dashboard = async (req, res) => {
    try {
        const courses = await CourseModel.find().populate('category_id');
        const categories = await Categories.find();
        res.render('admin/dashboard', { courses: courses, categories : categories, name: req.name });
      } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Error fetching courses');
      }
}

module.exports = { dashboard }