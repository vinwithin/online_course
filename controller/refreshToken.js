const Users = require('../model/User')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const refreshToken = async(req, res) => {
    try{
        const refreshToken = req.cookies.refresh_token
        if (!refreshToken) return res.sendStatus(401).json({message: "tidak ada token"})
        const user = await Users.findOne({
            refresh_token: refreshToken
        })
        if(!user) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, decode) => {
            if(err) return res.sendStatus(403).json({message: "tidak ada token"})
            const userId = user._id
            const name = user.name
            const email = user.email
            const role = user.role
            const accessToken = jwt.sign({userId, name, email, role}, process.env.PRIVATE_ACCESS_TOKEN, {
                expiresIn: '60s'
            })
            
            res.cookie('access_token', accessToken,{
                httpOnly : true,
                maxAge :60 * 1000
            })
            res.json({ accessToken })
            // return res.json({ accessToken });
        }); 
        
    }catch(error){
        console.log(error)
    }
}
module.exports = { refreshToken }