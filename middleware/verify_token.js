const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const verifyToken = (req, res, next)=> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.PRIVATE_ACCESS_TOKEN, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    })
}
const adminOnly = (req, res, next)=> {
    
    if (req.role !== "admin") return res.status(403).json('Akses Ditolak'); 
    next();
   
}
module.exports = {verifyToken, adminOnly};