module.exports = function logger(req, res, next) {
	console.log(
		`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`
	);

	next();
};
