const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const verifyToken = (req, res, next)=> {
    const token = req.cookies['access_token'];
    if (token == null) res.redirect('/login');

    jwt.verify(token, process.env.PRIVATE_ACCESS_TOKEN, (err, decoded) => {
        if(err) return res.redirect('/login');
        req.userId = decoded.userId;
        req.role = decoded.role;
        req.exp = decoded.exp;
        next();
    })
}
const adminOnly = (req, res, next)=> {
    
    if (req.role !== "admin") return res.status(403).json('Akses Ditolak'); 
    next();
   
}
module.exports = {verifyToken, adminOnly};