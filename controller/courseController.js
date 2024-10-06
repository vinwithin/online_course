const CourseModel = require("../model/Course")
const create = async (req, res) => {
  const { title, description, price, category_id } = req.body;
  try {
    await CourseModel.create({
      title,
      image: req.file.filename,
      description,
      price,
      category_id,
    });
    res.status(200).send({ msg: "Succesfully adding course"});
  } catch (error) {
    return res.status(500).json({ message: "Error creating product" });
  }
 
};

module.exports = {create}