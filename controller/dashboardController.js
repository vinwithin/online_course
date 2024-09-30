const refreshToken = require("./refreshToken");

const dashboard = async (req, res) => {
    const expired = req.exp
    // const currendDate = new Date();
    // if(req.exp < currendDate.getTime()){
    //     try {
    //         await refreshToken(); // Pastikan untuk mengirim req jika perlu
    //     } catch (error) {
    //         console.error("Error refreshing token:", error);
    //         return res.status(500).send("Failed to refresh token");
    //     }
    // }
    res.render('index', {exp: expired})
}

module.exports = { dashboard }