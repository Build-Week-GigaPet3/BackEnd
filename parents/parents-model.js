const db = require('../database/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove
};

function find() {
	return db('parents')
		.select('id', 'username')
		.orderBy('id');
}

function findBy(filter) {
	return db('parents').where(filter);
}

async function add(parent) {
	const [id] = await db('parents').insert(parent, 'id');

	return findById(id);
}

function findById(id) {
	return db('parents')
		.select('id', 'username')
		.where({ id })
		.first();
}

function update(id, changes) {
	return db('parents')
		.where({ id })
		.update(changes, 'id');
}

function remove(id) {
	return db('parents')
		.where({ id })
		.del();
}
