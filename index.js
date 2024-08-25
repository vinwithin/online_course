const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')
const url = require('url')
const router = require('./routes/route')


app.set("views", "./view" )
app.set('view engine', 'ejs');
app.use(router)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})