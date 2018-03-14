// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Price

// Setting the modules/variables for the price route
const express = require('express');
const router = express.Router();
const CoinMarketCap = require("node-coinmarketcap"); // will be used for acquiring the bitcoin prices
const coinmarketcap = new CoinMarketCap();
const CronJob = require('cron').CronJob;
const mysql = require('mysql');
const dbconfig = require('../config/database');
const connection = mysql.createConnection(dbconfig.connection);


// Cron job that will be called every one minute to
// get the current bitcoin value and save it to the database
new CronJob('0 * * * * *', function(){
	// purchasing the bitcoin info from the coin market cap
	coinmarketcap.get("bitcoin", coin => {
		// generating the date 
		var date = new Date();
		var price = {
	  			moeda: coin.name,
	  			valor: coin.price_usd.toString(),
	  			data: date.toLocaleString(),
	  			exchange: 'CoinMarketCap'
  			}

  		// inserting the bitcoin price obtained into the database
  		connection.query('INSERT INTO price SET ?', price, function(err, results){
			if(err) throw err;
			console.log('Bitcon value ' + price.valor + 
				' inserted into database (' + price.data + ')');
		});
	});

}, null, true, 'America/Sao_Paulo');

/**
 * @api {get} /price/: Retrieve information about all the bitcoin informations stored so far
 * @apiVersion 0.3.0
 * @apiName GetPrice
 * @apiGroup Price
 * @apiPermission none
 *
 * @apiSuccess {String}   message 					Message containing an information.
 * @apiSuccess {Number}   differenceFromLastPrice	Percentual difference between the current price and the last one.
 * @apiSuccess {String}   moeda         			The criptacoin name.
 * @apiSuccess {Date}     data    					Date and time that the price was obtained.
 * @apiSuccess {Number}   valor         			Value of the criptacoin.
 * @apiSuccess {String}   exchange      			Exchange used for purchasing the informations.
 *
 * @apiSuccessExample Success-Response:
 *     {
 {
    "message": "Bitcoins values successfully fetched",
    "differenceFromLastPrice": "0.33031531580493834 %",
    "values": [
        {
            "moeda": "Bitcoin",
            "data": "2018-3-13 19:31:01",
            "valor": "9203.8",
            "exchange": "CoinMarketCap"
        },
        {
            "moeda": "Bitcoin",
            "data": "2018-3-13 19:32:00",
            "valor": "9203.8",
            "exchange": "CoinMarketCap"
        },
        {
            "moeda": "Bitcoin",
            "data": "2018-3-13 19:58:01",
            "valor": "9200.3",
            "exchange": "CoinMarketCap"
        },
        {
            "moeda": "Bitcoin",
            "data": "2018-3-13 19:59:01",
            "valor": "9200.3",
            "exchange": "CoinMarketCap"
        },
        {
            "moeda": "Bitcoin",
            "data": "2018-3-13 20:00:00",
            "valor": "9200.3",
            "exchange": "CoinMarketCap"
        },
        {
            "moeda": "Bitcoin",
            "data": "2018-3-13 20:01:00",
            "valor": "9200.3",
            "exchange": "CoinMarketCap"
        },
        {
            "moeda": "Bitcoin",
            "data": "2018-3-13 20:16:01",
            "valor": "9230.69",
            "exchange": "CoinMarketCap"
        }
    ]
 *     }
 *
 */

// Handles GET requests for /price
// It returns all the bitcoin values
router.get('/', function(req, res, next){
	// query for fetch all the bitcoin values stored in the database
	connection.query('SELECT moeda, data, valor, exchange FROM price', function(err, results){
		if(err) throw err;

		// computing the percentual difference between the current and the last
		// bitcoin value
		var currentValue = parseFloat(results[results.length - 1].valor);
		var lastValue = parseFloat(results[results.length - 2].valor);
		var percDiff = 100.0*(currentValue/lastValue) - 100;

		res.status(200).json({
			message: "Bitcoins values successfully fetched",
			differenceFromLastPrice: percDiff.toString() + ' %',
			values: results 
		});

	});
});


module.exports = router;