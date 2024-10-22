const joi = require('joi')
const Lesson  = require('../model/Lessons')

const Lesson = require('../models/Lesson');

// Menampilkan semua lesson
exports.listLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    res.render('lessons/index', { lessons });
  } catch (error) {
    res.status(500).send('Error retrieving lessons');
  }
};

// Menampilkan form untuk membuat lesson baru
exports.showCreateForm = (req, res) => {
  res.render('lessons/create');
};

// Menyimpan lesson baru ke database
exports.createLesson = async (req, res) => {
  try {
    const { title, content, course_id, order_number } = req.body;
    await Lesson.create({ title, content, course_id, order_number });
    res.redirect('/lessons');
  } catch (error) {
    res.status(500).send('Error creating lesson');
  }
};

// Menampilkan form edit lesson
exports.showEditForm = async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    res.render('lessons/edit', { lesson });
  } catch (error) {
    res.status(500).send('Error retrieving lesson');
  }
};

// Mengupdate lesson di database
exports.updateLesson = async (req, res) => {
  try {
    const { title, content, course_id, order_number } = req.body;
    await Lesson.update(
      { title, content, course_id, order_number },
      { where: { id: req.params.id } }
    );
    res.redirect('/lessons');
  } catch (error) {
    res.status(500).send('Error updating lesson');
  }
};

// Menghapus lesson dari database
exports.deleteLesson = async (req, res) => {
  try {
    await Lesson.destroy({ where: { id: req.params.id } });
    res.redirect('/lessons');
  } catch (error) {
    res.status(500).send('Error deleting lesson');
  }
};
