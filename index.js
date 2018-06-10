require('dotenv').config();
const faker = require('faker');
const mysql = require('mysql');
const pretty = require('js-object-pretty-print').pretty;
const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// Error Print
function handleError(err){
  return `SQL attempted: ${err.sql}\nError Returned: ${err.sqlMessage}`;
};

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
    const count = results[0].user_count;
    res.render('home', {count});
  });
});

// Create New User
app.post('/register', (req, res)=> {
  const person = {email: req.body.email };
  connection.query('INSERT INTO users SET ?', person, function(err,result){
    if(err){
      res.send(handleError(err));
    }else{
      console.log(pretty(result));
      res.redirect('/');
    }
  });
});

// Open Express Connection
app.listen(8080);
