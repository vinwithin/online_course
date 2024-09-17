const express = require('express');
const router = express.Router();
const User = require('../config/firebase');
const bcrypt = require('bcrypt');
const { addDoc, collection } = require("firebase/firestore");

router.get('/', (req, res) => {
    res.render("index")
})

router.get('/login', (req, res) => {
    res.render("login")
})
router.get('/register', (req, res) => {
    res.render("register")
})

router.post("/create", async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body
        if (password !== confirm_password) return res.status(401).json({message : "Password dan Confirm Password tidak sama"})
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        await addDoc(User, {
            name, email, hashedPassword
        });
        res.status(200).send({ msg: "Succesfully adding user"});
    } catch (error) {
        res.status(500).send({ msg: "Error adding user", error: error.message });
    }
  });
  

module.exports = router;
