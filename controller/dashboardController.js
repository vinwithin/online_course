const refreshToken = require("./refreshToken");

const dashboard = async (req, res) => {
    const expired = req.exp
    res.render('index', {exp: expired})
}

module.exports = { dashboard }