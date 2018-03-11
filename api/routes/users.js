// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Users

// Setting the modules/variables for the users route
const express = require('express');
const router = express.Router();

// Handles GET requests for /users
router.get('/', function(req, res, next){
	res.status(200).json({
		message: "User GET" 
	});
});

// Handles POST requests for /users
router.post('/', function(req, res, next){
	// thanks for the body parser, the request has a body property, which contains properties
	// from the json object corresponding to the user sign up
	var user = {
		email: req.body.email,
		senha: re.body.senha
	};
	res.status(201).json({
		message: "User POST",
		registeredUser: user
	});
});

module.exports = router;