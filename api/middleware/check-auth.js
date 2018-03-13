const jwt = require('jsonwebtoken');

// Middleware that will be used in the private routes
module.exports = function(req, res, next){
	try{
		var token = req.headers.authorization.split(" ")[1]; // it takes the token, and it ignores the bearer
		var decoded = jwt.verify(token, 'secret');
		res.userData = decoded;
		next();
	}catch(error){
		return res.status(403).json({
			message: 'Authentication failed! Not allowed to access this data'
		});
	}

};