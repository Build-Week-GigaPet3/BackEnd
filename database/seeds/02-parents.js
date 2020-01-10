exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('parents')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('parents').insert([
				{ username: 'Kurt', password: 'jamaica' },
				{ username: 'Maddy', password: 'chickenpotpie' }
			]);
		});
};
