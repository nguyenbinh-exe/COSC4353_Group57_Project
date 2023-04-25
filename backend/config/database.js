const mongoose = require('mongoose');
require('dotenv').config();

const conn = process.env.DB_STRING;

mongoose.connect(conn);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database established!");
})

module.exports = connection;