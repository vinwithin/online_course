const UserModel = require('../model/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const register = async(req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body
        if (password !== confirm_password) return res.status(401).render('register', { error: "Password dan Confirm Password tidak sama" });
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        await UserModel.create({
            name,
            email,
            password : hashedPassword,
            role: "user"
        })
        // res.status(200).send({ msg: "Succesfully adding user"});
        res.redirect('/login')
    } catch (error) {
        res.status(500).render('register', { error: error.message });
    }
}

const login = async(req, res) => {
    // try{
        const { email, password } = req.body 
        const user = await UserModel.findOne({
                email: email 
        })
        if(!user) return res.render('login', {error: "Akun Belum Terdaftar"});
        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword) return res.render('login', {error: 'Password salah'});
        const userId = user._id
        const name = user.name;
        const emailUser = user.email;
        const role = user.role;
        jwt.sign({userId, name, emailUser, role }, process.env.PRIVATE_ACCESS_TOKEN, {
            expiresIn: '60s'
        })
        const refreshToken = jwt.sign({userId, name, emailUser, role }, process.env.REFRESH_ACCESS_TOKEN, {
            expiresIn: '1d'
        })
        await UserModel.updateOne({ _id: userId }, { refresh_token: refreshToken });
        res.cookie('refresh_token', refreshToken,{
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000
        })
        res.redirect('/')
    // }catch(error){
    //     res.render('login', {error: "Gagal Melakukan Login"})
    // }
}


module.exports = {register, login}