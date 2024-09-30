const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { register, login, logout } = require('../controller/authController')
const { refreshToken } = require('../controller/refreshToken')
const { verifyToken } = require('../middleware/verify_token')
const { dashboard } = require('../controller/dashboardController')


router.get('/', verifyToken, dashboard)

router.get('/login', (req, res) => {
    res.render("login", error = false)
})
router.get('/register', (req, res) => {
    res.render("register", error = 0)
})

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get('/token', refreshToken)
  

module.exports = router;
