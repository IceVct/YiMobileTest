// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Users

// Setting the modules/variables for the users route
const express = require('express');
const router = express.Router();
//const connection = require('../models/dbconnection');
const mysql = require('mysql');
const dbconfig = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = mysql.createConnection(dbconfig.connection);

connection.connect(function(error){
	if(error){
		console.log('Error connecting to the database!');
		throw error;
	}else{
		console.log('Database connected!');
	}
});

// Handles POST requests for /users, which is the login method
router.post('/login', function(req, res, next){
	// searching for the user in the database
	connection.query('SELECT * FROM users WHERE email = ?', req.body.email, function(err, results){
		if(err){
			throw err;
		}else{
			// if the user trying to login is not registered
			if(results.length < 1){
				return res.status(401).json({
					message: 'Authentication failed!'
				});
			}
			bcrypt.compare(req.body.senha, results[0].senha, function(err, result){
				if(err){
					return res.status(401).json({
						message: 'Authentication failed!'
					});
				}
				// if the password passed as argument is the same as the recorded in the database
				// in other words, the authentication is successfull
				if(result){
					// creating the token
					const token = jwt.sign({
						email: results[0].email,
					}, 'TesteYiMobile', {
						expiresIn: 60
					});

					return res.status(200).json({
						message: 'Successfull authentication!',
						token: token
					});
				}

				// if its a wrong passed
				res.status(401).json({
					message: 'Authentication failed!'
				});

			});
		}
	});
});

// Handles POST requests for /users, which is the sign up method
router.post('/signup', function(req, res, next){
	// thanks for the body parser, the request has a body property, which contains properties
	// from the json object corresponding to the user sign up

	// logic for seeing if there's already the email to be registered in the database
	connection.query('SELECT email FROM users WHERE email = ?', req.body.email, function(err, results){
	// 	// if there's an error, it throws
		if(err){
			throw err;
		}else{
			// if the query has a response, it means that the email is already registered
			if(results.length > 0){
				return res.status(409).json({
					message: 'Already registered email!'
				});
			}else{
				// if its not already registered, then it can be added to the database
				bcrypt.hash(req.body.senha, 10, function(err, hash){
					if(err) error: err

					var user = {
						email: req.body.email,
						senha: hash
					};	

					// adding the user to the database
					connection.query('INSERT INTO users SET ?', user, function(err, results){
						if(err) throw err;

						res.status(201).json({
							message: "User successfully registered!",
							registeredUser: user
						});
					});
					
				});
			}
		}
	});

});

module.exports = router;