const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

dotenv.config();


//connect database
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Database is connected'))
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1); 
  });
  
const port = 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

//routes
app.use('/', require('./routes/authRoutes.js'));

// server
app.listen(port, () =>console.log(`Server is running on ${port}`))
