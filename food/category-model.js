const db = require('../database/dbConfig');

module.exports = {
	find
};

function find() {
	return db('food_category')
		.select('*')
		.orderBy('id');
}
