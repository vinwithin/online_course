const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser');
const db = require('./config/mongodb.js')
const UserModel = require('./model/User.js')
const router = require('./routes/route')
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override')




const app = express()
const PORT = 3000

// UserModel.sync();
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('database connected'));


app.use(session({
    secret: process.env.SESSION_TOKEN, // Gantilah dengan secret key yang aman
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));

app.use(flash());

// Middleware to make flash messages available to all views
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success');
    res.locals.error_message = req.flash('error');
    next();
});

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(router)



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})