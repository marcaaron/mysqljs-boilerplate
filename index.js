require('dotenv').config();
const faker = require('faker');
const mysql = require('mysql');
const pretty = require('js-object-pretty-print').pretty;
const express = require('express');
const app = express();

// Open MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQLPW,
  database: 'join_us'
});

// Hook Up EJS
app.set('view engine', 'ejs');

// Set Up Index Route
app.get('/', (req, res) => {
  const q = 'SELECT COUNT(*) as user_count FROM users';
  connection.query(q, function(err, results){
    if(err) throw err;
    res.send(`We have ${results[0].user_count} users.`);
  });
});

// Open Express Connection
app.listen(8080);
