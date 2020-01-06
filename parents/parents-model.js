const db = require('../database/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove,
	findMyGigapet
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

function findMyGigapet(parentId) {
	return db('pets as gp')
		.join('parents as p', 'gp.parent_id', 'p.id')
		.select(
			'gp.id',
			'gp.pet_name',
			'gp.pet_type',
			'gp.image',
			'p.id as parentId',
			'p.username as parent'
		)
		.where({ parent_id: parentId });
}
