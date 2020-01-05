const db = require('../database/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById
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
