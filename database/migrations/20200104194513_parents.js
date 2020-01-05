exports.up = function(knex) {
	return knex.schema.createTable('parents', tbl => {
		tbl.increments();

		tbl
			.string('username', 255)
			.notNullable()
			.unique();

		tbl.string('password', 128).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('parents');
};
