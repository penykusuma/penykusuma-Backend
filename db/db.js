const mysql = require("mysql")

// membuat koneksi database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend'
})

// membuat koneksi mysql
connection.connect(error => {
    if (error) throw error;
    console.log("successfully connected to database");
});

module.exports = connection