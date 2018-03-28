var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// Database
const mongoose = require('mongoose')
const dbUrl = `mongodb://kevin:12345@ds135234.mlab.com:35234/hacktivoverflow`
mongoose.connect(dbUrl, (err) => {
  if (!err) {
    console.log('Database connected')
  } else {
    console.log(`Database error`)
  }
})

const Home = require('./routes/index')
const User = require('./routes/user')

app.use('/user', User)
app.use('/', Home)


module.exports = app;
