const Joi = require("joi");
const CourseModel = require("../model/Course")


const courseSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().greater(0).required(),
  category_id: Joi.string().max(100).required(),
});

const create = async (req, res) => {

  const { title, description, price, category_id } = req.body;
  const { error } = courseSchema.validate({title, description, price, category_id});

  if (error) {
    req.flash('error', error.details[0].message);
    return res.redirect('/admin');
  }

  try {
    await CourseModel.create({
      title,
      image: req.file.filename,
      description,
      price,
      category_id,
    });
    req.flash('success', 'Course successfully created!');
    res.redirect('/admin');
  } catch (error) {
    req.flash('error', 'Error while creating course');
    res.redirect('/admin');
  }
 
};

const destroy = async(req, res) => {
  try{
    const courseId = req.params.id;
    await CourseModel.findByIdAndDelete(courseId);
    req.flash('success', 'Course successfully deleted');
    res.redirect('/admin');
  }catch (err) {
    req.flash('error', 'Error while deleting course');
    res.redirect('/admin');
  }
};

const edit = async(req, res) => {
  try {
    const courseId = req.params.id;
    const courses = await CourseModel.findById(courseId).populate('category_id');
    const categories = await Categories.find();
    res.render('admin/course/edit', { courses: courses, categories : categories, name: req.name });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses');
  }
}

const update = async(req, res) => {
  const { title, description, price, category_id } = req.body;
  const { error } = courseSchema.validate({title, description, price, category_id});
  const courseId = req.params.id;
  const existingImage = await CourseModel.findById(courseId).image;

  if (error) {
    req.flash('error', error.details[0].message);
    return res.redirect('/admin');
  }

  try {
    await CourseModel.findByIdAndUpdate(courseId, {
      title,
      image: req.file ? req.file.filename : existingImage, // Update image jika ada file baru, jika tidak gunakan gambar yang sudah ada
      description,
      price,
      category_id,
    });
    req.flash('success', 'Course successfully created!');
    res.redirect('/admin');
  } catch (error) {
    req.flash('error', 'Error while creating course');
    res.redirect('/admin');
  }
}


module.exports = {create, destroy, edit, update}