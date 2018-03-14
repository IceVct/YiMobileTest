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

/**
 * @api {get} /orders/: Retrieve all the orders created by an user
 * @apiVersion 0.3.0
 * @apiName GetOrders
 * @apiGroup Orders
 * @apiPermission AuthenticatedUser
 *
 * @apiSuccess {String}   message 					Message containing an information.
 * @apiSuccess {Date}     data         				Date and time that the order was created.
 * @apiSuccess {Number}   qtdbtc    				Amount of criptacoins bought.
 * @apiSuccess {Number}   valorporbtc         		Value of the criptacoin.
 * @apiSuccess {String}   tipo      				Type of order (compra|venda).
 *
 * @apiSuccessExample Success-Response:
 *     {
 {
    "message": "Orders from the user teste@teste.com",
    "orders": [
        {
            "data": "02/10/1995",
            "qtdbtc": "0.3",
            "valorporbtc": "9800",
            "tipo": "compra"
        },
        {
            "data": "02/10/1995",
            "qtdbtc": "0.3",
            "valorporbtc": "9230.92",
            "tipo": "compra"
        },
        {
            "data": "13/03/2018",
            "qtdbtc": "0.2",
            "valorporbtc": "9230.92",
            "tipo": "venda"
        },
        {
            "data": "13/03/2018",
            "qtdbtc": "1.2",
            "valorporbtc": "9194.85",
            "tipo": "compra"
        },
        {
            "data": "13/03/2018",
            "qtdbtc": "1.5",
            "valorporbtc": "9219.04",
            "tipo": "compra"
        },
        {
            "data": "13/03/2018",
            "qtdbtc": "1.1",
            "valorporbtc": "9219.04",
            "tipo": "venda"
        },
        {
            "data": "2018-3-13 23:30:58",
            "qtdbtc": "1.1",
            "valorporbtc": "9310.43",
            "tipo": "compra"
        }
    ]
 *     }
 *
 * @apiError FailedAuthentication If the user is not authenticated.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "message": 'Authentication failed! Not allowed to access this data'
 *     }
 *
 */

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

/**
 * @api {post} /orders/ Add an order for an user
 * @apiName PostOrders
 * @apiGroup Orders
 * @apiPermission AuthenticatedUser
 *
 * @apiParam {Number} qtdbtc Amount of criptacoins that the user wants to buy.
 * @apiParam {String} tipo Type of order (compra|venda).
 *
 * @apiSuccess {String} message Message containing an information.
 * @apiSuccess {JSON} registeredOrder JSON object containing the order that will be registered.
 *
 * @apiSuccessExample Success-Response:
 *  {
	    "message": "Order successfully added for user teste@teste.com",
	    "registeredOrder": {
	        "usuarioid": 13,
	        "data": "2018-3-13 23:30:58",
	        "qtdbtc": "1.1",
	        "valorporbtc": "9310.43",
	        "tipo": "compra"
	    }
 *  }
 *
 * @apiError FailedAuthentication If the user is not authenticated.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "message": 'Authentication failed! Not allowed to access this data'
 *     }
 */

//global.bitcoinValue;
// Handles POST requests for /orders, which add an order for an user
router.post('/', checkAuth, function(req, res, next){
	// thanks for the body parser, the request has a body property, which contains properties
	// from the json object corresponding to the order registered

	var date = new Date();
	// assembling the order object
	var order = {
		usuarioid: res.userData.id,
		data: date.toLocaleString(),
		qtdbtc: req.body.qtdbtc,
		valorporbtc: '',
		tipo: req.body.tipo
	};

	// query for taking the current bitcoin value in the database
	connection.query('SELECT valor FROM price', function(err, results){
		if(err) throw err;
		var bitcoinValue = results[results.length - 1].valor;
		order.valorporbtc = bitcoinValue;
	});

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