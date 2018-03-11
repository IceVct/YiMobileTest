// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Orders

// Setting the modules/variables for the orders route
const express = require('express');
const router = express.Router();

// Handles GET requests for /orders
router.get('/', function(req, res, next){
	res.status(200).json({
		message: "Orders GET" 
	});
});

// Handles POST requests for /orders
router.post('/', function(req, res, next){
	// thanks for the body parser, the request has a body property, which contains properties
	// from the json object corresponding to the order registered
	var order = {
		usuarioid: req.body.usuarioid,
		data: req.body.data,
		qtdbtc: req.body.qtdbtc,
		valorporbtc: req.body.valorporbtc,
		tipo: req.body.tipo
	};

	res.status(201).json({
		message: "Orders POST" ,
		registeredOrder: order
	});
});

module.exports = router;