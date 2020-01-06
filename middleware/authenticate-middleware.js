const jwt = require('jsonwebtoken');
const secret = require('../secrets/secrets');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		jwt.verify(authorization, secret.jwtSecret, function(err, decodedToken) {
			if (err) {
				res.status(401).json({ message: 'Access not granted!' });
			} else {
				req.token = decodedToken;
				next();
			}
		});
	} else {
		res.status(400).json({ message: 'Please login and try again.' });
	}
};
