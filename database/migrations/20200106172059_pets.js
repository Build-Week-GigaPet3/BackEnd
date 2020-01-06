exports.up = function(knex) {
	return knex.schema.createTable('pets', tbl => {
		tbl.increments();

		tbl.string('pet_name', 128).notNullable();

		tbl.string('pet_type', 128).notNullable();

		tbl.string('image');

		tbl
			.integer('parent_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('parents')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('pets');
};
