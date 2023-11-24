const express = require('express');
const app = express();
app.use(express.static("public"));

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));


//db.js

let connection = require('./db.js');

const tryUser = (username) => {
    // SQL query to check if the username exists in the 'name' table and get the row number
    const sqlQuery = 'SELECT ROW_NUMBER() OVER (ORDER BY id) AS row_num FROM name WHERE username = ?';

    // Execute the query
    connection.query(sqlQuery, [username], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            return;
        }

        if (results.length > 0) {
            const rowIndex = results[0].row_num;
            return rowIndex;
        } else {
            console.log('Username not found in the name table.');
            return 0;
        }

    });
}

const getUserData = (response,userID) => {
    const sqlQuery = `SELECT * FROM your_table_name WHERE first_column_name = ${indexToQuery}`;

    // Execute the query for relation table
    connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
        console.error('Error executing query for relation table:', error);
    } else {
        courseIDs = results;
        connection.query("SELECT * FROM usertablecourse;", function (error, resultSQL) {
            if (error) {
            response.status(400).send(error);
            } else {
            let dataBase = {}
            response.status(200);
            dataBase = resultSQL;
            console.log(dataBase);
            response.render('consultations.ejs', { dataList: dataBase });
            }
        });
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
        response.render('home.ejs', { dataList: dataBase });
        }
    });
};

app.post('/login', (request,response)=>{

    if (request.body.username != null){
        let userID = tryUser(request.body.username);
        if (userID != 0){
            getUserData(response,userID);
        }
        else{getCourseData(response)};
    }
    else{
        getCourseData(response)
    }
})

app.get('/',(request,response)=>{
    getCourseData(response, connection);
})

app.use(express.static('public'));

app.listen(3000, function(){
    console.log("Server ok");
});




