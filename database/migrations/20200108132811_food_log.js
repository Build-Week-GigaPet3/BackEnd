exports.up = function(knex) {
	return knex.schema.createTable('food_log', tbl => {
		tbl.increments();

		tbl
			.string('food_item')
			.notNullable()
			.unique();

		tbl
			.integer('food_category_id')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('food_category')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl
			.integer('parent_id')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('parents')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropIfTableExists('food_log');
};
