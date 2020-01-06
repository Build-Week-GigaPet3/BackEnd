const db = require('../database/dbConfig');

module.exports = {
	find,
	findById,
	add,
	remove,
	update
};

function find() {
	return db('pets')
		.select('*')
		.orderBy('id');
}

function findById(id) {
	return db('pets')
		.select('*')
		.where({ id })
		.first();
}

async function add(pet) {
	const [id] = await db('pets').insert(pet, 'id');

	return findById(id);
}

function remove(id) {
	return db('pets')
		.where({ id })
		.del();
}

function update(id, changes) {
	return db('pets')
		.where({ id })
		.update(changes, 'id');
}
