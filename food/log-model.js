const db = require('../database/dbConfig');

module.exports = {
	find,
	findById,
	add,
	remove,
	update
};

function find() {
	return db('food_log')
		.select('*')
		.orderBy('id');
}

function findById(id) {
	return db('food_log')
		.select('*')
		.where({ id })
		.first();
}

async function add(log) {
	const [id] = await db('food_log').insert(log, 'id');

	return findById(id);
}

function remove(id) {
	return db('food_log')
		.where({ id })
		.del();
}

function update(id, changes) {
	return db('food_log')
		.where({ id })
		.update(changes, 'id');
}
