const express = require('express');
require('dotenv/config');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./db/connection.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use('/css', express.static(path.resolve(__dirname, "css")));
app.use('/js', express.static(path.resolve(__dirname, "js")));


const rectangleController = require('./controllers/rectangleController');
app.use('/rectangles', rectangleController);

//Connect to DB
database.connect();

//Load routers
app.use('/', require('./routes/router'));

//LISTEN    
app.listen(3000, function(){
    console.log("Listening to http://localhost:3000");
});

