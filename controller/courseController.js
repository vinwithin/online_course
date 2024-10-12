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
    return res.status(400).json({message: error.details[0].message})
  }
  try {
    await CourseModel.create({
      title,
      image: req.file.filename,
      description,
      price,
      category_id,
    });
    res.redirect('/admin/dashboard');
  } catch (error) {
    return res.status(500).json({ message: "Error creating product" });
  }
 
};



module.exports = {create}