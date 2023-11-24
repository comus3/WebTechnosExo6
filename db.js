const fs = require('fs');

// Read the content of pwd.txt synchronously
try {
    const passwordContent = fs.readFileSync('pwd.txt', 'utf8');
    
    var mysql = require("mysql");
    //connection base de donnees
    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : passwordContent,
        database : 'users'
    });

    connection.connect(function(error){if (error) console.log(error);});
    module.exports = connection;
} catch (err) {
  console.error('Error reading pwd.txt:', err);
}

