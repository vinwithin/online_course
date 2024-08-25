const { Sequelize } = require('sequelize');
const db = new Sequelize('db_courses', 'root', '',{
    host: "localhost",
    dialect : "mysql"
})
module.exports= db;