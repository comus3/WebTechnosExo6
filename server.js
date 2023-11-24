const express = require('express');
const app = express();
app.use(express.static("public"));

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));


//db.js

let connection = require('./db.js');

const getUserData = (response) => {
    connection.query("SELECT * FROM usertablecourse;", function (error, resultSQL) {
        if (error) {
        response.status(400).send(error);
        } else {
        let dataBase = {}
        response.status(200);
        dataBase = resultSQL;
        console.log(dataBase);
        response.render('home.ejs', { taskTable: dataBase });
        }
    });
};
const getCourseData = (response) => {
    connection.query("SELECT * FROM tablecourse;", function (error, resultSQL) {
        if (error) {
        response.status(400).send(error);
        } else {
        let dataBase = {}
        response.status(200);
        dataBase = resultSQL;
        console.log(dataBase);
        response.render('home.ejs', { taskTable: dataBase });
        }
    });
};



app.use(express.static('public'));

app.listen(3000, function(){
    console.log("Server ok");
});




