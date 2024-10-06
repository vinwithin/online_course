const express = require('express')
const cookieParser = require('cookie-parser');
const db = require('./config/mongodb.js')
const UserModel = require('./model/User.js')
const router = require('./routes/route')
const path = require('path')



const app = express()
const PORT = 3000

// UserModel.sync();
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('database connected'));


// app.set("views", "./view" )
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(router)



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})