// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Orders

// Setting the modules/variables for the orders route
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const mysql = require('mysql');
const dbconfig = require('../config/database');
const connection = mysql.createConnection(dbconfig.connection);

// Handles GET requests for /orders, which returns every orders from an user
router.get('/', checkAuth, function(req, res, next){
	// query for taking all the orders created by the user
	connection.query('SELECT data, qtdbtc, valorporbtc, tipo FROM orders WHERE usuarioid = ?', 
					res.userData.id, function(err, results){
		if(err) throw err;
			
		res.status(200).json({
			message: "Orders from the user " + res.userData.email,
			orders: results 
		});
	});
});

global.bitcoinValue;

// Handles POST requests for /orders, which add an order for an user
router.post('/', checkAuth, function(req, res, next){
	// thanks for the body parser, the request has a body property, which contains properties
	// from the json object corresponding to the order registered

	// query for taking the current bitcoin value in the database
	connection.query('SELECT valor FROM price', function(err, results){
		if(err) throw err;
		bitcoinValue = results[results.length - 1].valor;
	});

	// assembling the order object
	var order = {
		usuarioid: res.userData.id,
		data: req.body.data,
		qtdbtc: req.body.qtdbtc,
		valorporbtc: bitcoinValue,
		tipo: req.body.tipo
	};

	// inserting the order into the database
	connection.query('INSERT INTO orders SET ?', order, function(err, results){
		if(err) throw err;

		res.status(201).json({
			message: "Order successfully added for user " + res.userData.email,
			registeredOrder: order
		});
	});

});

module.exports = router;