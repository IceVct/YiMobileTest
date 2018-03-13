// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Application

// Setting the modules/variables/routes for the application
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connection = require('express-myconnection');
const mysql = require('mysql');
const usersRoutes = require('./api/routes/users');
const priceRoutes = require('./api/routes/price');
const ordersRoutes = require('./api/routes/orders');

// Initializing morgan, for printing the requests being handled by the application
// and bodyParser, for parsing json objects and encoded urls
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

// Handling with the API permissions for preventing CORS errors
// app.use(function(req, res, next){
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", 
// 		"Origin, X-Requested-With, Content-Type, Accept, Authorization");
// 	// the only allowed http methods
// 	if(req.method === 'OPTIONS'){
// 		res.header('Access-Control-Allow-Methods', 'GET, POST');
// 		return status(200).json({});
// 	}
// });

// Routes for handling requests
app.use('/users', usersRoutes);
app.use('/price', priceRoutes);
app.use('/orders', ordersRoutes);

// Error handling
// Handling error in case that the URL requested is not valid or it doesnt exist
app.use(function(req, res, next){
	const error = new Error('Not found!');
	error.status = 404;
	next(error);
});

// Handling erros from the whole application
app.use(function(error, req, res, next){
	res.status(error.status || 500); // if there's no specific error code, returns 500
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;