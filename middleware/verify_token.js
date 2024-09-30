const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const verifyToken = (req, res, next)=> {
    const token = req.cookies['access_token'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.PRIVATE_ACCESS_TOKEN, (err, decoded) => {
        if(err) return res.sendStatus(403).json({message: "tidak ada token"});
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