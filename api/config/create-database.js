// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Database creation

const mysql = require('mysql');
const dbconfig = require('./database');

const connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE IF NOT EXISTS ' + dbconfig.database, function(err, results){
	// if there's an error, it throws
	if(err){
		throw err;
	}else{
		console.log('Database created!');
	}
});

// Creating the users table
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `email` VARCHAR(50) NOT NULL, \
    `senha` VARCHAR(70) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)', function(err, results){
	if(err){
		throw err;
	}else{
		console.log('User table created!');
	}
});

//Creating the orders table
connection.query('\
CREATE TABLE IF NOT EXISTS`' + dbconfig.database + '`.`' + dbconfig.orders_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `usuarioid` INT UNSIGNED NOT NULL, \
    `data` DATETIME NOT NULL, \
    `qtdbtc` VARCHAR(70) NOT NULL, \
    `valorporbtc` VARCHAR(70) NOT NULL, \
    `tipo` VARCHAR(7), \
        PRIMARY KEY (`id`), \
        FOREIGN KEY (`usuarioid`) REFERENCES users(`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)', function(err, results){
	if(err){
		throw err;
	}else{
		console.log('Orders table created!');
	}
});

// Creating the price table
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.price_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `moeda` VARCHAR(12) NOT NULL, \
    `data` DATETIME NOT NULL, \
    `valor` VARCHAR(70) NOT NULL, \
    `exchange` VARCHAR(70) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)', function(err, results){
	if(err){
		throw err;
	}else{
		console.log('Price table created');
	}
});


connection.end();