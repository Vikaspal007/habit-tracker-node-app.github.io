const express = require('express');
//const mongoose = require('mongoose');
const app = express();
const db=require('./config/mongoose');



// Set up EJS as the template engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/index'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
