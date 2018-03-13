// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Price

// Setting the modules/variables for the price route
const express = require('express');
const router = express.Router();

// Handles GET requests for /price
// It returns all the prices
router.get('/', function(req, res, next){
	res.status(200).json({
		message: "Price GET" 
	});
});


module.exports = router;