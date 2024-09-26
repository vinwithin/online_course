const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { register, login } = require('../controller/authController')


router.get('/', (req, res) => {
    res.render("index")
})

router.get('/login', (req, res) => {
    res.render("login", error = false)
})
router.get('/register', (req, res) => {
    res.render("register", error = false)
})

router.post("/register", register);
router.get("/masuk", login);
  

module.exports = router;
