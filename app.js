// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Application

// Setting the modules/variables for the application
const express = require('express');
const app = express();

app.use(function (req, res, next){
	res.status(200).json({
		message: "It works", 
	});
});

module.exports = app;