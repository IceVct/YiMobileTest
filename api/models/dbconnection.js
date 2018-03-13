// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Database connection
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'host',
	password: '12345678',
	port: '3306', 
	database:'TesteYiMobile'
});

// Handling errors related to the database connection
connection.connect(function(error){
	if(error){
		console.log('Error connecting to the database!');
		throw error;
	}else{
		console.log('Database connected!');
	}
});


module.exports = connection;